const NPC = require('../models/npcModel');

const npcController = {};
npcController.create = async data => await NPC.create({ ...data });
npcController.readAll = async () => await NPC.find().exec();
npcController.read = async id => await NPC.findById(id).exec();
npcController.update = async data => await NPC.findOneAndUpdate({ _id: data._id}, {$set: {...data, lastUpdateDate: Date.now()}}).exec();
npcController.delete = async id => await NPC.deleteOne({ _id: id }).exec();

module.exports = npcController;
