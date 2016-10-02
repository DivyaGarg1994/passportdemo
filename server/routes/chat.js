var express = require('express');
var router = express.Router();
var auth = require('../config/auth.js')();

/* GET home page. */
router.get('/',auth.authenticate(), function(req, res, next) {
  //res.render('index', { title: 'ejs' });
  console.log("-----hi-------");
//  res.json(req.user.name);
});

router.get('/user',function(req,res,next){
  var name = req.query.username;
  res.render('index');
});

// router.get('/singleChat',function(req,res,next){
//   var id = req.query.uid;
//   console.log("------------");
//   console.log("id=="+id);
//   res.send("jjj");
// });
//
// router.get('/download', function(req,res,next){
//     var file = req.query.filenames;
//     console.log(file);
//     var path1 = __dirname+'/uploads/'+file;
//     console.log(path1);
//   //  res.download(path);
//     res.sendFile(path1);
// });

module.exports = router;
