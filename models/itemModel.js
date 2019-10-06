const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
	name: { type: String, required: true, minlength: 3, maxlength: 25 },
	sprite: { type: Number, default: 1, min: 1, max: 12 },
	stack: { type: Number, default: 0, min: 0 },
	equipSlot: { type: Number, default: 0, min: 0, max: 5},
	damage: { type: Number, default: 0, min: 0, max: 255 },
	defence: { type: Number, default: 0, min: 0, max: 255 },
	health: { type: Number, default: 0, min: 0, max: 255 },
	energy: { type: Number, default: 0, min: 0, max: 255 },
	createDate: { type: Date, default: Date.now },
	lastUpdateDate: { type: Date, default: null },
});

module.exports = mongoose.model('Item', itemSchema, 'items');
