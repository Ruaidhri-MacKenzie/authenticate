const Character = require('../models/characterModel');

const characterSelect = '_id name role level sprite map x y direction inventory user createDate lastLoginDate';
const characterInfoSelect = '_id name role level sprite user';

const characterController = {};
characterController.create = async data => await Character.create(data);
characterController.readAll = async () => await Character.find().select(characterSelect).populate("role").exec();
characterController.read = async id => await Character.findById(id).select(characterSelect).populate('role').exec();
characterController.update = async data => await Character.findOneAndUpdate({ _id: data._id}, {$set: data}).select(characterSelect).exec();
characterController.delete = async id => await Character.deleteOne({ _id: id }).exec();
characterController.findByUser = async userId => await Character.find({ user: userId }).select(characterInfoSelect).populate('role').exec();
characterController.checkExistingName = async name => await Character.findOne({ name: { $regex: new RegExp(name, "i") } }).exec();	// Case insensitive regex
characterController.updateLastLogin = id => Character.updateOne({ _id: id}, {$set: { lastLoginDate: Date.now()}});

module.exports = characterController;
