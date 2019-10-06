const Character = require('../models/characterModel');

const characterController = {};
characterController.create = async data => await Character.create({ ...data }).exec();
characterController.readAll = async () => await Character.find().exec();
characterController.read = async id => await Character.findById(id).exec();
characterController.update = async data => await Character.findOneAndUpdate({ _id: data._id}, {$set: data}).exec();
characterController.delete = async id => await Character.deleteOne({ _id: id }).exec();
characterController.findByUser = async userId => await Character.find({ user: userId }).exec();
characterController.checkExistingName = async name => await Character.findOne({ name: { $regex: new RegExp(name, "i") } }).exec();	// Case insensitive regex
characterController.updateLastLogin = id => Character.updateOne({ _id: id}, {$set: { lastLoginDate: Date.now()}});

module.exports = characterController;
