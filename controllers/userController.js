const User = require('../models/user');
const bcrypt = require('bcrypt-nodejs');
const salt = bcrypt.genSaltSync(10);
const passport = require('passport');

module.exports = {

   createUser: (req, res) => {
      User.findOne({
         email: req.body.email
      }).then(user => {
         if (user) {
            return res.status(500).json({
               status: false,
               message: 'This email is already taken'
            })
         }
         req.body.password = bcrypt.hashSync(req.body.password, salt);
         let newUser = new User(req.body);
         newUser.save((err, done) => {
            console.log(done)
            if (done) res.redirect('/')
         })
      });

   },

   getBlogs: (req, res) => {
      let isAuth = req.isAuthenticated();

      res.render('index', {isAuth});
   },

   getComments: (req, res) => {
      let isAuth = req.isAuthenticated();

      res.render('comments', {isAuth});
   },

   registrate: (req, res) => {
      res.render('registrate');
   },

   postLogin: (req, res, next) => {
      passport.authenticate('local',
         function (err, user, info) {
            return err ?
               next(err) :
               user ?
               req.login(user, function (err) {
                  if (err) {
                     return next(err)
                  } else {
                     res.redirect('/')
                  }
               }) :
               res.json({
                  status: false,
                  message: "User don't find.",
                  data: err
               });
         }
      )(req, res, next);
   },

   postLogout: (req, res, next) => {
      req.logout();
      res.redirect('/');
   }
}