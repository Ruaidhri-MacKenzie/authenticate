const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/userModel');
const Character = require('../models/characterModel');

const signUp = async (req, res, next) => {
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
	
	const users = await User.find({ username: { $regex: new RegExp(username, "i") } }).exec();	// Case insensitive regex
	if (users.length > 0) {
		res.status(409).json({ message: "Username already exists."});
		return;
	}
	
	bcrypt.hash(password, 10, (err, hash) => {
		if (err) {
			res.status(500).json(err);
		}
		else {
			const user = new User({
				username,
				password: hash,
				email,
			});
		
			user.save()
			.then(result => res.status(201).json(user))
			.catch(err => res.status(500).json(err));
		}
	});
};

const signIn = (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		if (err) return next(err);
		if (!user) return res.status(404).json({message: "Authentication failed"});

		const { _id, username, email } = user;
		Character.find({ user: _id }).exec()
		.then(characters => res.status(200).json({ _id, username, email, characters }))
		.catch(err => res.status(500).json(err));
	})(req, res, next);
};

const signOut = (req, res, next) => {
	console.log("SIGNED OUT");
	req.logout();
};

module.exports = {
	signUp,
	signIn,
	signOut,
};
