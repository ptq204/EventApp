const passport = require('passport');
const FacebookStrategy = require('passport-facebook');

passport.use(new FacebookStrategy({
    clientID: '1140715026103376',
    clientSecret: '9b875434dbe77d8b8e72ad04957fce32',
    callbackURL: "https://event-everyday.herokuapp.com/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    cb(null, profile);
  }
));

module.exports = passport;

