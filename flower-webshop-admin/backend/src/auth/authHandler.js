const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userService = require('../controllers/users/users.service');

const login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new createError.BadRequest('Missing properties!'));
    }

    const user = await userService.findByEmail(email);

    if (!user) {
        return next(new createError.BadRequest('Hibás email vagy jelszó!'));
    }

    bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
            return next(new createError.InternalServerError('Error during password comparing!'));
        }

        if (result) {
            const accessToken = jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: process.env.TOKEN_EXPIRY,
            });
            return res.json({ accessToken });
        }

        return next(new createError.BadRequest('Hibás email vagy jelszó!'));
    });

    return false;
};

module.exports = {
    login,
};
