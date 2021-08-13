const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

module.exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return next(new createError.NotFound('User not found!'));
        }

        const verified = await user.verifyPassword(password);
        if (!verified) {
            return next(new createError.BadRequest('Incorrect Credentials!'));
        }

        const accessToken = jwt.sign({
            email: user.email,
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRY
        });

        res.json({ accessToken, user });

    } catch (e) {
        res.json('Username or password incorrect.');
    }
};
