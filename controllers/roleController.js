const Role = require('../models/roleModel');

const roleController = {};
roleController.create = async data => await Role.create({ ...data });
roleController.readAll = async () => await Role.find().exec();
roleController.read = async id => await Role.findById(id).exec();
roleController.update = async data => await Role.findOneAndUpdate({ _id: data._id}, {$set: {...data, lastUpdateDate: Date.now()}}).exec();
roleController.delete = async id => await Role.deleteOne({ _id: id }).exec();
roleController.checkExistingName = async name => await Role.findOne({ name: { $regex: new RegExp(name, "i") } }).exec();	// Case insensitive regex

module.exports = roleController;
