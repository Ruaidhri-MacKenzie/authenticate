const passport = require('passport');
const bcrypt = require('bcrypt');
const userController = require('../controllers/userController');

const authHandler = {};
authHandler.cookieSignIn = async (req, res, next) => {
	await userController.updateLastLogin(req.user._id);
	return res.status(200).json(req.user);
};

authHandler.signUp = async (req, res, next) => {
	const { password, email } = req.body;
	const username = req.body.username.trim();

	let error = null;
	if (!username) error = "Username is required";
	if (username.length > 25) error = "Username is too long";
	if (username.length < 3) error = "Username is too short";
	if (!password) error =  "Password is required";
	if (password.length < 8) error = "Password is too short";
	if (!email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) error = "Invalid email address";
	if (await userController.checkExistingUsername(username)) error = "Username already exists";

	if (error) {
		return res.status(400).json({message: error});
	}

	// const existingUser = await userController.checkExistingUsername(username);
	// if (existingUser) {
	// 	res.status(409).json({message: "Username already exists"});
	// 	return;
	// }
	
	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(password, salt);
	if (!hash) {
		return res.status(500).json({message: "Create new user failed"});
	}

	const user = await userController.create({ username, password: hash, email });
	if (!user) {
		return res.status(500).json({message: "Create new user failed"});
	}

	req.login(user, err => {
		if (err) return next(err);
		const { _id, username, email, characters } = user;
		return res.status(201).json({ _id, username, email, characters });
	})
};

authHandler.signIn = (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		if (err) return next(err);
		if (!user) return res.redirect('/auth/failed/auth');
		
		req.login(user, async err => {
			if (err) return next(err);
			const { _id, username, email, verified, createDate, lastLoginDate } = user;
			
			await userController.updateLastLogin(_id);
			return res.status(200).json({ _id, username, email, verified, createDate, lastLoginDate });
		});
	})(req, res, next);
};

authHandler.signOut = (req, res, next) => {
	req.logout();
	req.session.destroy(err => {
		if (err) return res.status(500).json(null);
		return res.status(200).clearCookie('sessionId', {path: '/'}).json({message: "Signed out"});
	});
};

module.exports = authHandler;
