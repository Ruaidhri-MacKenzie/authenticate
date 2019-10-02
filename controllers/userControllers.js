const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../keys');
const User = require('../models/userModel');

const getAllUserData = (req, res, next) => {
	User.find().exec()
	.then(docs => res.status(200).json(docs))
	.catch(err => res.status(500).json(err));
};

const getUserData = (req, res, next) => {
	User.findById(req.params.userId).exec()
	.then(docs => res.status(200).json(docs))
	.catch(err => console.log(err));
};

const editUser = (req, res, next) => {
	User.updateOne({ _id: req.params.userId }, req.body, err => (!err) ? res.status(200) : res.status(500));
};

const removeUser = (req, res, next) => {
	User.deleteOne({ _id: req.params.userId }, err => (!err) ? res.status(200) : res.status(500));
};

const signUp = async (req, res, next) => {
	const { username, password, email } = req.body;
	const trimUsername = username.trim();

	if (!username) {
		res.status(400).json({err: "Username is required."});
		return;
	}

	if (trimUsername.length > 25) {
		res.status(400).json({err: "Username is too long."});
		return;
	}

	if (!email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
		res.status(400).json({err: "Invalid email address."});
		return;
	}
	
	const users = await User.find({ username: { $regex: new RegExp(trimUsername, "i") } }).exec();	// Case insensitive regex
	if (users.length > 0) {
		res.status(409).json({ err: "Username already exists."});
		return;
	}
	
	bcrypt.hash(password, 10, (err, hash) => {
		if (err) {
			res.status(500).json(err);
		}
		else {
			const user = new User({
				username: trimUsername,
				password: hash,
				email,
			});
		
			user.save()
			.then(result => res.status(201).json(user))
			.catch(err => res.status(500).json(err));
		}
	});
};

const signIn = async (req, res, next) => {
	const { username, password } = req.body;
	const trimUsername = username.trim();

	if (!username) {
		res.status(400).json({err: "Username required."});
		return;
	}
	if (!password) {
		res.status(400).json({err: "Password required."});
		return;
	}

	const users = await User.find({ username: trimUsername }).exec();
	if (!users || users.length === 0) {
		res.status(404).json({err: "User not found."});
		return;
	}

	bcrypt.compare(password, users[0].password, (err, match) => {
		if (!err) {
			if (match) {
				const token = jwt.sign({
					username: users[0].username,
					userId: users[0]._id
				},
				JWT_KEY,
				{
					expiresIn: "1h"
				});
				
				res.status(200).json(token);
			}
			else {
				res.status(401).json({err: "Auth failed."});
			}
		}
		else {
			res.status(401).json({err: "Auth failed."});
		}
	});
};

const signOut = (req, res, next) => {
	console.log("WORKS");
};

module.exports = {
	getAllUserData,
	getUserData,
	editUser,
	removeUser,
	signUp,
	signIn,
	signOut,
};
