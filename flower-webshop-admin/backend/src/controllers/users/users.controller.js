/* eslint-disable no-underscore-dangle */
const createError = require('http-errors');
const bcrypt = require('bcrypt');

const userService = require('../../controllers/users/users.service');

// For bcrypt
const saltRounds = 10;

exports.findAll = async (_req, res) => {
    const users = await userService.findAll();
    res.json(users);
    return users;
};

exports.findOne = async (req, res, next) => {
    const user = await userService.findOne(req.params.id);
    if (!user) {
        return next(new createError.NotFound('User is not found'));
    }
    res.json(user);
    return user;
};

exports.create = async (req, res, next) => {
    const {
        email, password, active,
    } = req.body;

    if (!email || !password || !active) {
        return next(new createError.BadRequest('Missing properties!'));
    }

    let newUserFromDatabase;

    bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
            return next(new createError.InternalServerError('Error during password encryption!'));
        }

        const newUserFromReqBody = {
            email,
            password: hash,
            active,
        };

        newUserFromDatabase = await userService.create(newUserFromReqBody);
        res.status(201);
        res.json(newUserFromDatabase);
        return newUserFromDatabase;
    });

    return newUserFromDatabase;
};

exports.update = async (req, res, next) => {
    const { id } = req.params;

    const {
        email, password, active,
    } = req.body;

    const oldData = await userService.findOne(id);

    if (!oldData) {
        return next(new createError.NotFound('User is not found!'));
    }

    let updatedEntity = {};

    bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
            return next(new createError.InternalServerError('Error during password encryption!'));
        }

        const updatedData = {
            _id: id,
            email: email || oldData.email,
            password: hash || oldData.password,
            active: active === undefined ? oldData.active : active,
        };

        try {
            updatedEntity = await adminService.update(updatedData._id, updatedData);
            return res.json(updatedEntity);
        } catch (error) {
            return next(new createError.InternalServerError(error.message));
        }
    });
    return false;
};

exports.delete = async (req, res, next) => {
    try {
        await userService.delete(req.params.id);
    } catch (error) {
        return next(new createError.InternalServerError(error.message));
    }

    res.json({});
    return {};
};
