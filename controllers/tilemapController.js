const Tilemap = require('../models/tilemapModel');

const tilemapController = {};
tilemapController.create = async data => await Tilemap.create({ ...data });
tilemapController.readAll = async () => await Tilemap.find().exec();
tilemapController.read = async id => await Tilemap.findById(id).exec();
tilemapController.update = async data => await Tilemap.findOneAndUpdate({ _id: data._id}, {$set: data}).exec();
tilemapController.delete = async id => await Tilemap.deleteOne({ _id: id }).exec();
tilemapController.checkExistingIndex = async index => await Tilemap.findOne({ index: index }).exec();

module.exports = tilemapController;
