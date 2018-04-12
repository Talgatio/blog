const router = require("express").Router();
const userController = require('../controllers/userController');

router.get('', userController.getBlogs);
router.get('/comments', userController.getComments);
router.use('/public', require('./public'));
router.use('/user', require('./user'));
router.use('/api/blog', require('./blog'));
router.use('/api/comments', require('./comments'));

module.exports = router;