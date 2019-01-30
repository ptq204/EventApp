const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/userModel');

passport.use(new GoogleStrategy({
    clientID: '6821226207-8qa8f1lp7eh3q4vr0fisgh1bcoq8lst5.apps.googleusercontent.com',
    clientSecret: 'q2Q9O5VroEJ6pMeG97a45dw9',
    //callbackURL: 'http://localhost:4000/auth/google/callback'
    callbackURL: 'https://event-everyday.herokuapp.com/auth/google/callback'
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(accessToken);
    if(profile.id){
      User.findOne({GoogleID: profile.id}, (err, user) => {
        if(err) throw err;
        if(user){
          console.log(user);
          cb(null, user);
        }
        else{
          new User({
            GoogleID: profile.id,
            Email: profile.emails[0].value,
            Username: profile.name.familyName + ' ' + profile.name.givenName 
          }).save((err2, user2) => {
            if(err2) throw err2;
            console.log(user2);
            cb(null, user2);
          })
        }
      })
    }
  }
));

module.exports = passport;

