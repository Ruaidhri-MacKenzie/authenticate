const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true, minlength: 3, maxlength: 25 },
	sprite: { type: Number, default: 1, min: 1, max: 12 },
	damage: { type: Number, default: 5, min: 0, max: 255 },
	defence: { type: Number, default: 0, min: 0, max: 255 },
	health: { type: Number, default: 80, min: 0, max: 255 },
	energy: { type: Number, default: 40, min: 0, max: 255 },
	healthPerLevel: { type: Number, default: 1, min: 0, max: 255 },
	energyPerLevel: { type: Number, default: 1, min: 0, max: 255 },
	createDate: { type: Date, default: Date.now },
	lastUpdateDate: { type: Date, default: null },
});

module.exports = mongoose.model('Role', roleSchema, 'roles');
