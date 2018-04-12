const User = require('../models/user');
const Blog = require('../models/blog');
const config = require('../config');

module.exports = {

   getCount: (req, res) => {
      let query = req.query;
      let author = query.where && query.where['author'] ? query.where['author'] : {$exists: true}
      Blog.count({
         author,
         status: {
            $not: /deleted/gi
         }
      }).then((count) => {
         res.status(200).json({
            status: true,
            message: 'Blogs Count',
            data: count
         })
      }).catch(e => {
         res.status(500).json({
            status: false,
            message: 'Server Error'
         })
      })
   },

   getAll: (req, res) => {
      let query = req.query;
      
      let limit = query.limit ? parseInt(query.limit, 10) : 10;
      let offset = query.offset ? parseInt(query.offset, 10) : 0;
      let order = query.order ? query.order : {};
      let author = query.where && query.where['author'] ? query.where['author'] : {$exists: true}
      Blog.find({
            author: author,
            status: {
               $not: /deleted/gi
            }
         })
         .limit(limit)
         .skip(offset)
         .sort(order)
         .then(blogs => {
            res.status(200).json({
               status: true,
               message: 'All blogs',
               data: blogs
            })
         }).catch(e => {
            res.status(500).json({
               status: false,
               message: 'Server Error',
               data: e
            })
         })
   },

   createBlog: (req, res) => {
      if (req.isAuthenticated()) {
         let user = req.session.passport.user;
         req.body.author = user._id;
         req.body.authorName = user.username ? user.username : 'Anonimus';
         req.body.status = 'active';

         let blog = new Blog(req.body);
         blog.save((err, blog) => {
            if (err) {
               return res.status(500).json({
                  status: false,
                  message: 'Server error'
               })
            }
            res.status(200).json({
               status: true,
               message: 'Blog create',
               data: blog
            })
         })
      } else {
         res.status(401).json({
            status: false,
            message: 'Unauthorized'
         })
      }
   },

   getOneBlog: (req, res) => {
      Blog.findOne({
         _id: req.params.id,
         status: {
            $not: /deleted/gi
         }
      }).then(blog => {
         if(!blog) {
            return res.status(404).json({
               status: false,
               message: 'Not found'
            })
         }
         res.status(200).json({
            status: true,
            messasge: 'One blog',
            data: blog
         })
      }).catch(e => {
         res.status(500).json({
            status: false,
            message: 'Server error',
            data: e
         });
      });
   },

   updateBlog: (req, res) => {
      if (req.isAuthenticated()) {
         let user = req.session.passport.user;
         req.body.updatedAt = Date.now();
         console.log(req.body)
         Blog.findOne({
            _id: req.params.id
         }).then(blog => {
            if(blog.author.equals(user._id) || user.role === 'admin') {
               blog.update(req.body, (err, done) => {
                  if(done.ok === 1) {
                     Blog.findOne({
                        _id: req.params.id
                     }).then(blog => {
                        res.status(200).json({
                           status: true,
                           message: 'Blog updated',
                           data: blog
                        })
                     }).catch(e => {
                        res.status(500).json({
                           status: false,
                           message: 'Server error'
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

   deleteBlog: (req, res) => {
      if (req.isAuthenticated()) {
         let user = req.session.passport.user;
         req.body.updatedAt = Date.now();
         Blog.findOne({
            _id: req.params.id
         }).then(blog => {
            if(blog.author.equals(user._id) || user.role === 'admin') {
               blog.update({
                  status: 'deleted'
               }, (err, done) => {
                  if(done.ok === 1) {
                     Blog.findOne({
                        _id: req.params.id
                     }).then(blog => {
                        res.status(200).json({
                           status: true,
                           message: 'Blog deleted',
                           data: blog
                        })
                     }).catch(e => {
                        res.status(500).json({
                           status: false,
                           message: 'Server error'
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