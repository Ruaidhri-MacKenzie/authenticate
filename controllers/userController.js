const User = require('../models/userModel');

const userController = {};
userController.create = async data => await User.create(data);
userController.readAll = async () => await User.find().exec();
userController.read = async id => await User.findById(id).exec();
userController.update = async data => await User.findOneAndUpdate({ _id: data._id}, {$set: data}).exec();
userController.delete = async id => await User.deleteOne({ _id: id }).exec();
userController.checkExistingUsername = async username => await User.findOne({ username: { $regex: new RegExp("^" + username + "$", "i") } }).exec();	// Case insensitive regex
userController.updateLastLogin = id => User.updateOne({ _id: id}, {$set: { lastLoginDate: Date.now()}});

module.exports = userController;
