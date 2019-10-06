const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true, minlength: 3, maxlength: 25 },
	password: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	verified: { type: Boolean, default: false },
	admin: { type: Number, default: 0, min: 0, max: 5 },
	createDate: { type: Date, default: Date.now },
	lastLoginDate: { type: Date, default: null },
});

module.exports = mongoose.model('User', userSchema, 'users');
