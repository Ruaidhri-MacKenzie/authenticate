const bcrypt = require('bcrypt');
const passport = require('passport');
const userController = require('../controllers/userController');
const characterController = require('../controllers/characterController');

const authHandler = {};

authHandler.signUp = async (req, res, next) => {
	const { password, email } = req.body;
	const username = req.body.username.trim();

	if (!username) {
		res.status(400).json({message: "Username is required"});
		return;
	}

	if (username.length > 25) {
		res.status(400).json({message: "Username is too long"});
		return;
	}

	if (username.length < 3) {
		res.status(400).json({message: "Username is too short"});
		return;
	}
	
	if (!password) {
		res.status(400).json({message: "Password is required"});
	}

	if (password.length < 8) {
		res.status(400).json({message: "Password is too short"});
	}

	if (!email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
		res.status(400).json({message: "Invalid email address"});
		return;
	}
	
	const existingUser = await userController.checkExistingUsername(username);
	if (existingUser) {
		res.status(409).json({message: "Username already exists"});
		return;
	}
	
	const hash = await bcrypt.hash(password, 10);
	if (!hash) {
		res.status(500).json({message: "Create new user failed"});
		return;
	}

	const user = await userController.create(username, hash, email);
	if (!user) {
		res.status(500).json({message: "Create new user failed"});
		return;
	}

	res.status(201).json(user);
};

authHandler.signIn = (req, res, next) => {
	passport.authenticate('local', async (err, user, info) => {
		if (err) return next(err);
		if (!user) return res.status(404).json({message: "Authentication failed"});
		
		const { _id, username, email } = user;
		const characters = await characterController.findByUser(_id);
		res.status(200).json({ _id, username, email, characters, session: req.session });
		
		userController.updateLastLogin(_id);
	})(req, res, next);
};

authHandler.signOut = (req, res, next) => {
	console.log("SIGNED OUT");
	req.logout();
};

module.exports = authHandler;
