const express = require('express');
const authHandler = require('../handlers/authHandler');
const { checkAuth, checkNoAuth } = require('../middleware/checkAuth');

const authRouter = express.Router();

authRouter.get('/', checkAuth, authHandler.cookieSignIn);
authRouter.post('/signup', checkNoAuth, authHandler.signUp);
authRouter.post('/signin', checkNoAuth, authHandler.signIn);
authRouter.post('/signout', checkAuth, authHandler.signOut);

module.exports = authRouter;
