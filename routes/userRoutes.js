const express = require('express');
const userControllers = require('../controllers/userControllers');
const checkAuth = require('../middleware/checkAuth.js');

const router = express.Router();

router.get('/', checkAuth, userControllers.getAllUserData);
router.get('/:userId', checkAuth, userControllers.getUserData);
router.put('/:userId', checkAuth, userControllers.editUser);
router.delete('/:userId', checkAuth, userControllers.removeUser);

router.post('/signup', userControllers.signUp);
router.post('/signin', userControllers.signIn);
router.post('/signout', checkAuth, userControllers.signOut);

module.exports = router;
