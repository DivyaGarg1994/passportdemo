var mongoose = require('mongoose');

  //CREATE A schema for chatApp
  var ChatSchema = mongoose.Schema({
    id : String,
    user1 : String,
    user2 : String,
    chat : [{"sender":String , "msg":String , "time":Date}]
  });

  // CREATE A model for the schema
  var ChatModel = mongoose.model('ChatModel' , ChatSchema);

module.exports = ChatModel;
