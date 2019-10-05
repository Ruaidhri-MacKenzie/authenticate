const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true },
	sprite: { type: Number, default: 1},
	level: { type: Number, default: 1},
	role: { type: Number, default: 0},
	
	map: { type: Number, default: 1},
	x: { type: Number, default: 0},
	y: { type: Number, default: 0},
	direction: { type: String, default: 'down'},
});

module.exports = mongoose.model('Character', characterSchema, 'characters');
