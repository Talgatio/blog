const router = require('express').Router();
const blogController = require('../../controllers/blogController');

router.get('', blogController.getAll);
router.get('/count', blogController.getCount);
router.post('', blogController.createBlog);
router.put('/:id', blogController.updateBlog);
router.delete('/:id', blogController.deleteBlog);
router.get('/:id', blogController.getOneBlog);

module.exports = router;