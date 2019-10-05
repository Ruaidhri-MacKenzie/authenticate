const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	verified: { type: Boolean, default: false },
	admin: { type: Number, default: 0 },
	startDate: { type: Date, default: Date.now },
	lastLogin: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema, 'users');
