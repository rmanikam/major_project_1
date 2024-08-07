const passport = require("passport");
const User = require("../models/user");

const LocalStrategy = require("passport-local").Strategy;

// authentication using passport

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },

    function (email, password, done) {
      // done is callback func which is reporting to passport.js

      // find a user and establish the identity

      User.findOne({ email: email }, function (err, user) {
        if (err) {
          console.log("Error in finding user --->  Passport");
          return done(err);
        }

        if (!user || user.password != password) {
          console.log("Invalid Username/ Password");
          // null means there is no error and false means authentication is false
          return done(null, false);
        }
        // null means there is no error and user is found
        return done(null, user);
      });
    }
  )
);

// serializing the user to decide which key is
// to kept in the cookies

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// deserializing the user from the key in the cookies

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log("Error in finding user --->  Passport");
      return done(err);
    }
    return done(null, user);
  });
});

// check if user is authenticated

passport.checkAuthentication = function (req, res, next) {
  // if the user is signed in, then pass on the request
  // to the next function(controller's action)

  if (req.isAuthenticated()) {
    return next();
  }

  // if the user is not signed in

  return res.redirect("/users/sign-in");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    // req.user contains the current signed in user from the
    // session cookie and we are just sending this to locals
    // for the views
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
