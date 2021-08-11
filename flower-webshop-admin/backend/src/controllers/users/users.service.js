const User = require('../../models/user.model');
const userService = require('../../controllers/users/users.service');

userService.findByEmail = (email) => User.findOne({ email });

module.exports = userService;