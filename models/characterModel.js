const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true, minlength: 3, maxlength: 25 },
	sprite: { type: Number, default: 0, min: 0, max: 12 },
	level: { type: Number, default: 1, min: 1, max: 100 },
	role: {type: mongoose.SchemaTypes.ObjectId, ref: 'Role', required: true},
	
	map: { type: Number, default: 1, min: 1, max: 2000 },
	x: { type: Number, default: 0, min: 0, max: 11 },
	y: { type: Number, default: 0, min: 0, max: 11 },
	direction: { type: String, default: 'down', enum: ['left', 'right', 'up', 'down'] },
	
	user: {type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true },
	createDate: { type: Date, default: Date.now },
	lastLoginDate: { type: Date, default: null },
});

module.exports = mongoose.model('Character', characterSchema, 'characters');
