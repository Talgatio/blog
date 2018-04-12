let User = require('../models/user');
let Comment = require('../models/comment');

module.exports = {

   getCount: (req, res) => {
      let query = req.query;
      let articleId = query.where && query.where['articleId'] ? query.where['articleId'] : {$exists: true}
      Comment.count({
         articleId: articleId,
         status: {
            $not: /deleted/gi
         }
      }).then(count => {
         res.status(200).json({
            status: true,
            message: 'Blogs Count',
            data: count
         })
      }).catch(e => {
         res.status(500).json({
            status: false,
            message: 'Server Error',
            data: e
         })
      })
   },

   getAll: (req, res) => {
      let query = req.query;
      let articleId = query.where && query.where['articleId'] ? query.where['articleId'] : {$exists: true}
      let limit = query.limit ? query.limit : 10;
      let offset = query.offset ? query.offset : 0;
      let order = query.order ? query.order : {};

      Comment.find({
            articleId: articleId,
            status: {
               $not: /deleted/gi
            }
         })
         .limit(limit)
         .skip(offset)
         .sort(order)
         .then(comments => {
            res.status(200).json({
               status: true,
               message: 'All comments',
               data: comments
            })
         }).catch(e => {
            res.status(500).json({
               status: false,
               message: 'Server Error',
               data: e
            })
         })
   },

   createComment: (req, res) => {
      if (req.isAuthenticated()) {
         let user = req.session.passport.user;
         req.body.author = user._id;
         req.body.status = 'active';

         let comment = new Comment(req.body);
         comment.save((err, comment) => {
            if (err) {
               return res.status(500).json({
                  status: false,
                  message: 'Server error',
                  data: e
               })
            }
            res.status(200).json({
               status: true,
               message: 'Comment create',
               data: comment
            })
         })
      } else {
         res.status(401).json({
            status: false,
            message: 'Unauthorized'
         })
      }
   },

   getOneComment: (req, res) => {
      Comment.findOne({
         _id: req.params.id,
         status: {
            $not: 'deleted'
         }
      }).then(comment => {
         if(!comment) {
            return res.status(404).json({
               status: false,
               message: 'Not found'
            })
         }
         res.status(200).json({
            status: true,
            messasge: 'One comment',
            data: comment
         })
      }).catch(e => {
         res.status(500).json({
            status: false,
            message: 'Server error'
         });
      });
   },

   updateComment: (req, res) => {
      if (req.isAuthenticated()) {
         let user = req.session.passport.user;
         req.body.updatedAt = Date.now();
         Comment.findOne({
            _id: req.params.id
         }).then(comment => {
            if(comment.author.equals(user._id) || user.role === 'admin') {
               comment.update(req.body, (err, done) => {
                  if(done.ok === 1) {
                     Comment.findOne({
                        _id: req.params.id
                     }).then(comment => {
                        res.status(200).json({
                           status: true,
                           message: 'Comment updated',
                           data: comment
                        })
                     }).catch(e => {
                        res.status(500).json({
                           status: false,
                           message: 'Server error',
                           data: e
                        })
                     });
                  }
               });
            }
         });
      } else {
         res.status(401).json({
            status: false,
            message: 'Unauthorized'
         })
      }
   },

   deleteComment: (req, res) => {
      if (req.isAuthenticated()) {
         let user = req.session.passport.user;
         req.body.updatedAt = Date.now();
         Comment.findOne({
            _id: req.params.id
         }).then(comment => {
            if(comment.author.equals(user._id) || user.role === 'admin') {
               comment.update({
                  status: 'deleted'
               }, (err, done) => {
                  if(done.ok === 1) {
                     Comment.findOne({
                        _id: req.params.id
                     }).then(comment => {
                        res.status(200).json({
                           status: true,
                           message: 'Comment deleted',
                           data: comment
                        })
                     }).catch(e => {
                        res.status(500).json({
                           status: false,
                           message: 'Server error',
                           data: e
                        })
                     });
                  }
               });
            }
         });
      } else {
         res.status(401).json({
            status: false,
            message: 'Unauthorized'
         })
      }
   },

}