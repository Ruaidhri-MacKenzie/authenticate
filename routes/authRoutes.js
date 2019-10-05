const express = require('express');
const authControllers = require('../controllers/authControllers');
const checkAuth = require('../middleware/checkAuth.js');
const checkNoAuth = require('../middleware/checkNoAuth.js');

const router = express.Router();

router.post('/signup', checkNoAuth, authControllers.signUp);
router.post('/signin', checkNoAuth, authControllers.signIn);
router.post('/signout', checkAuth, authControllers.signOut);

module.exports = router;
