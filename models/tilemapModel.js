const mongoose = require('mongoose');

const defaultZeroLayer = new Array(12);
for (let y = 0; y < 12; y++) {
	defaultZeroLayer[y] = new Array(12).fill(0);
}

const defaultFalseLayer = new Array(12);
for (let y = 0; y < 12; y++) {
	defaultFalseLayer[y] = new Array(12).fill(false);
}

const defaultTiles = new Array(6);
for (let layer = 0; layer < 6; layer++) {
	defaultTiles[layer] = defaultZeroLayer;
}

const tilemapSchema = new mongoose.Schema({
	index: { type: Number, require: true, unique: true, min: 1, max: 2000},
	name: { type: String, default: "", minlength: 0, maxlength: 25 },
	tiles: { type: [[[Number]]], default: defaultTiles },
	wall: { type: [[Boolean]], default: defaultFalseLayer },
	damage: { type: [[Number]], default: defaultZeroLayer },
	createDate: { type: Date, default: Date.now },
	lastUpdateDate: { type: Date, default: null },
});

module.exports = mongoose.model('Tilemap', tilemapSchema, 'tilemaps');
