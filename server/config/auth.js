var passport = require("passport");
var passportJWT = require("passport-jwt");
var cfg = require("./config.js");

var UserModel = require('../model/UserSchema');
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;
var params = {
  secretOrKey: cfg.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeader()
};

module.exports = function() {
  var strategy = new Strategy(params, function(payload, done) {
    console.log("-------------payload-------------");
    console.log(payload);
  var user = UserModel.findOne({name:payload.name},function(err,user){
      if (user) {
        return done(null, {name:user.name});
      } else {
        return done(new Error("User not found"), null);
      }
    });
  });
  passport.use(strategy);
  return {
    initialize: function() {
      return passport.initialize();
    },
    authenticate: function() {
      console.log("log1");
      return passport.authenticate("jwt", {session:false});
    }
  };

};



// var passport = require("passport");
// var passportJWT = require("passport-jwt");
// var cfg = require("./config.js");
// var ExtractJwt = passportJWT.ExtractJwt;
// var Strategy = passportJWT.Strategy;
// var params = {
//   secretOrKey: cfg.jwtSecret,
//   jwtFromRequest: ExtractJwt.fromAuthHeader()
// };
//
// module.exports = function() {
//   var strategy = new Strategy(params, function(payload, done) {
//     var id = payload.id || null;
//     if (id) {
//       return done(null, {id: id});
//     } else {
//       return done(new Error("User not found"), null);
//     }
//   });
//   passport.use(strategy);
//   return {
//     initialize: function() {
//       return passport.initialize();
//     },
//     authenticate: function() {
//       return passport.authenticate("jwt", cfg.jwtSession);
//     }
//   };
//
// };
