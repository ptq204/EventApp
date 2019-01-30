const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/userModel');

passport.use(new GoogleStrategy({
    clientID: '6821226207-8qa8f1lp7eh3q4vr0fisgh1bcoq8lst5.apps.googleusercontent.com',
    clientSecret: 'q2Q9O5VroEJ6pMeG97a45dw9',
    callbackURL: "192.168.1.4:4000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    if(profile.id){
      User.findOne({GoogleID: profile.id}, (err, user) => {
        if(err) throw err;
        if(user){
          console.log(user);
          return user;
        }
        else{
          new User({
            GoogleID: profile.id,
            email: profile.email[0].value,
            name: profile.name.familyName + ' ' + profile.name.givenName 
          }).save((err2, user2) => {
            if(err2) throw err2;
            return user2;
          })
        }
      })
    }
  }
));

module.exports = passport;

