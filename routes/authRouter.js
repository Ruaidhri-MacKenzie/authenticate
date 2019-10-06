const express = require('express');
const authHandler = require('../handlers/authHandler');
const checkAuth = require('../middleware/checkAuth');
const checkNoAuth = require('../middleware/checkNoAuth');

const authRouter = express.Router();

authRouter.post('/signup', checkNoAuth, authHandler.signUp);
authRouter.post('/signin', checkNoAuth, authHandler.signIn);
authRouter.post('/signout', checkAuth, authHandler.signOut);

module.exports = authRouter;
