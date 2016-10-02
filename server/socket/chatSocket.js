 var ChatModel = require('../model/ChatSchema');
var path = require('path');
var ss = require('socket.io-stream');
var fs = require('fs');
module.exports = function(ioConn){

  var logUser = [];
  ioConn.on('connection' , function(socket){

    socket.on('disconnect', function(){

    var index;
      for(var i=0 ; i<logUser.length ; i++)
      {
        if(logUser[i].name == socket.name)
          index = i;
      }
      logUser.splice(index,1);
      socket.broadcast.emit('logarr',logUser);
      socket.emit('logarr',logUser);
    });  // on disconnect


  /*
      receiving messages
  */

  function getName(sid){
      for(var i=0 ; i<logUser.length ; i++)
      {
        if(logUser[i].id == sid)
          return logUser[i].name;
      }
  }

  //text msg
    socket.on('message', function(msg){

      saveData(msg.receiveFrom , msg.sendTo , msg.message);
      socket.to(msg.sendTo).emit('receiveMsg',msg.message);
    });


    //TODO : User is typing
    //
    // //user is typing
    // socket.on('typing', function(msg){
    //   socket.broadcast.emit('receiveTyping',msg);
    // });
    // //not typing
    // socket.on('notyping', function(msg){
    //   socket.broadcast.emit('receiveNoTyping',msg);
    // });

// list out logged in user
    socket.on('logged',function(msg){
      var flag=0;
      logUser.forEach(function(el){
            if(el.name == msg)
              {flag=1;}
        });

        if(flag==0){
          var user = {"name":msg , "id":socket.id };
          showListOfUsers(user,msg);
        }
    }); //on logged in user


    // show list of users
    function showListOfUsers(user,msg){

      logUser.push(user);
      socket.name = msg;
      socket.broadcast.emit('logarr',logUser);
      socket.emit('logarr',logUser);
    }


// request for a chat
    socket.on("requestChat",function(msg){

        socket.to(msg.receiverId).emit("requestChatMessage",{"receiverId":msg.receiverId,"senderId":msg.senderId,"senderName":msg.senderName});
    });


// request accpeted
    socket.on("acceptedRequest",function(msg){
      socket.to(msg.senderId).emit("acceptedReq",{"receiverId":msg.receiverId,"senderId":msg.senderId});

    });



    // file upload
    ss(socket).on("file",function(stream,data){

      var filename = path.basename(data.name);
      stream.pipe(fs.createWriteStream('public/uploads/'+filename));
    //  var msg = '<a href="/chat/download?filenames='+filename+'">'+filename+'</a>';

        stream.on('finish', function(){
            var msg = '<a href="/uploads/'+filename+'">'+filename+'</a>';
            socket.to(data.sender).emit('receiveMsg',msg);
            saveData(data.sender , data.receiver , filename);
        });

    }); //ss(socket)



      function saveData(send,receive,msg){

        var msgFrom = getName(receive);
        var msgTo = getName(send);

        var id1 = msgFrom + msgTo;
        var id2 = msgTo + msgFrom;
        var time = new Date().getTime();

        var chatHistory = new ChatModel(
                                        { id : id1 ,
                                          user1 : msgFrom ,
                                          user2 :msgTo,
                                          chat : {"sender":msgFrom , "msg":msg , "time":time}
                                        });

        ChatModel.findOne({ 'id': {$in:[id1,id2]}},function (err, users) {
            if (err || users==null) {
              //save
                chatHistory.save(function (err,newUser){
                    if(err) return console.log(err);
                    else {

                    }
                });
            }//saved
            else{
              //update
              var exisMsg = users.chat;
              var newMsg = {"sender":msgFrom , "msg":msg , "time":time};
              exisMsg.push(newMsg);
              users.save(function (err,newUser){
                  if(err) return console.log(err);
                  else {

                  }
              });

            }//else
          });//findone

      }//function ends here



  }); // on connect

}
