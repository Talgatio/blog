const jwt = require("jwt-simple");
const config = require('../config');
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const User = require("../models/user");

module.exports = function (passport) {
   passport.serializeUser(function (user, done) {
      done(null, user);
   });

   passport.deserializeUser(function (id, done) {
      User.findById(id, function (err, user) {
         done(err, user);
      });
   });

   passport.use(new LocalStrategy({
      usernameField: "email",
      passwordField: "password"
   }, function (email, password, done) {
      User.findOne({
         email: email
      }, function (err, user) {
         if (err) {
            done(err);
         }

         if (!user) {
            return done(null, false, {
               status: false,
               message: "No user found."
            });
         }


         if (!user.comparePassword(password)) {
            return done(null, false, {
               status: false,
               message: "Oops! Wrong password."
            });
         }

         user.save(function (err, user) {
            done(null, user, {
               status: true,
               message: "Login success."
            });
         });
      });
   }));

};