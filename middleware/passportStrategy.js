const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const localStrategy = new LocalStrategy((username, password, done) => {
	username = username.trim();
	if (!username) return done(null, false, { message: "Username is required"});
	if (!password) return done(null, false, { message: "Password is required"});
	
	User.findOne({ username: username }, (err, user) => {
		if (err) return done(err);
		if (!user) return done(null, false, { message: "Authentication failed"});

		bcrypt.compare(password, user.password, (err, match) => {
			if (err) return done(err);
			if (match) return done(null, user);
			else return done(null, false, { message: "Authentication failed"});
		});
	});
});

module.exports = localStrategy;
