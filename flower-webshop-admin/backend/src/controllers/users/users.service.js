const User = require('../../models/user.model');
const userService = require('../../controllers/users/users.service');

exports.create = userData => {
    const user = new user(userData);
    return user.save();
};

exports.findAll = () => User.find().populate('posts');

exports.findOne = id => User.findById(id).populate('posts');

exports.update = (id, updateData) => User.findByIdAndUpdate(id, updateData, { new: true });

exports.delete = id => User.findByIdAndRemove(id);