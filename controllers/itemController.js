const Item = require('../models/itemModel');

const itemController = {};
itemController.create = async data => await Item.create(data);
itemController.readAll = async () => await Item.find().exec();
itemController.read = async id => await Item.findById(id).exec();
itemController.update = async data => await Item.findOneAndUpdate({ _id: data._id}, {$set: {...data, lastUpdateDate: Date.now()}}).exec();
itemController.delete = async id => await Item.deleteOne({ _id: id }).exec();

module.exports = itemController;
