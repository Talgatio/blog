const router = require('express').Router();
const publicController = require('../../controllers/publicController');

router.get('/addBlog', publicController.addBlog);
router.get('/addComment', publicController.addComment);

module.exports = router;