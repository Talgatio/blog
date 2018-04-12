const router = require('express').Router();
const userController = require('../../controllers/userController');

router.get('/registrate', userController.registrate);
router.post('/login', userController.postLogin);
router.get('/logout', userController.postLogout);
router.post('/create', userController.createUser);

module.exports = router;