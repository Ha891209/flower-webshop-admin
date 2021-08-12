const User = require('../../models/user.model');
const userService = require('../../controllers/users/users.service');

exports.create = userData => {
    const user = new user(userData);
    return user.save();
};

userService.findOne = (id) => User.findOne({ _id: id });
userService.findByEmail = (email) => User.findOne({ email });
userService.findAll = () => User.find().populate('posts');
userService.update = (id, updateData) => User.findByIdAndUpdate(id, updateData, { new: true });
userService.delete = id => User.findByIdAndRemove(id);

module.exports = userService;