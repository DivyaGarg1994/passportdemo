var mongoose = require('mongoose');

  //CREATE A schema for chatApp
  var UserSchema = mongoose.Schema({
    name : String,
    password : String,
    email : String,
    contact : String
  });

  // CREATE A model for the schema
  var UserModel = mongoose.model('UserModel' , UserSchema);

module.exports = UserModel;
