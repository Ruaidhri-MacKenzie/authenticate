const express = require('express');
const userControllers = require('../controllers/userControllers');

const router = express.Router();

router.get('/', userControllers.getAllUserData);
router.get('/:userId', userControllers.getUserData);
router.put('/:userId', userControllers.editUser);
router.delete('/:userId', userControllers.removeUser);

router.post('/signup', userControllers.signUp);
router.post('/signin', userControllers.signIn);
router.post('/signout', userControllers.signOut);

module.exports = router;
