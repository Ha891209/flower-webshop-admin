const Flower = require('../../models/flower.model');

exports.create = flowerData => {
    const flower = new Flower(FlowerData);
    return flower.save();
};

exports.findAll = () => Flower.find();

exports.findOne = id => Flower.findById(id);

exports.update = (id, updateData) => Flower.findByIdAndUpdate(id, updateData, { new: true });

exports.delete = (id) => Flower.findByIdAndRemove(id);