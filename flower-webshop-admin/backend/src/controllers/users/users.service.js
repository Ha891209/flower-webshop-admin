const User = require('../../models/user.model');
// const userService = require('../../controllers/users/users.service');

exports.create = userData => {
    const user = new user(userData);
    return user.save();
};

exports.findAll = () => User.find();

exports.findOne = id => User.findById(id);

exports.update = (id, updateData) => User.findByIdAndUpdate(id, updateData, { new: true });

exports.delete = id => User.findByIdAndRemove(id);