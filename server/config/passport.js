var LocalStrategy = require("passport-jwt").Strategy;
var User = require("../Users");

var opts = {};
opts.secretOrKey = "kslkdlkhiy8iyiuiuh87y87yhhyg87yugug78uyiy9y87dls";

var cookieExtractor = function (req) {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  return token;
};

opts.jwtFromRequest = cookieExtractor;
module.exports = function (passport) {
  passport.use(
    new LocalStrategy(opts, function (jwt_payload, cb) {
      console.log("jwtPayload" + JSON.stringify(jwt_payload));
      User.findOne({ email: jwt_payload.email })
        .then(function (data) {
          return cb(null, data);
        })
        .catch(function (err) {
          console.log(err);
          return cb(err, false);
        });
    })
  );
};
