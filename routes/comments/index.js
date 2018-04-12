const router = require('express').Router();
const commentsController = require('../../controllers/commentsController');

router.get('', commentsController.getAll);
router.post('', commentsController.createComment);
router.get('/count', commentsController.getCount);
router.put('/:id', commentsController.updateComment);
router.delete('/:id', commentsController.deleteComment);
router.get('/:id', commentsController.getOneComment);

module.exports = router;