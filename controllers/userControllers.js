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

const signUp = (req, res, next) => {
	const { username, password, email } = req.body;
	if (!username) res.status(400).json({err: "Username is required."});
	
	const user = new User({
    username,
		password,
		email,
  });

	user.save()
	.then(result => res.status(201).json(user))
	.catch(err => res.status(500).json(err));
};

const signIn = (req, res, next) => {
	console.log("WORKS");
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
