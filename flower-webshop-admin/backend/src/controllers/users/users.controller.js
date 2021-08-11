const express = require('express');
const createError = require('http-errors');

const userService = require('./users.service');

//Create

exports.create = (req, res, next) => {
    const { firstName, lastName, email, active, password, accesToken, role } = req.body;
    if (!title) {
        return next(
            new createError.BadRequest('Missing properties!')
        );
    }

    const newUser = {
        firstName,
        lastName,
        email,
        highlighted,
        active,
        password,
        accesToken,
        role
    };

    return userService.create(newUser)
        .then(createdUser => {
            res.status(201);
            res.json(createdUser);
        })
        .catch(err => next(new createError.InternalServerError(err.message)));
};

exports.findAll = (req, res, next) => {
    return userService.findAll()
        .then(users => {
            res.json(users);
        });
}

exports.findOne = (req, res, next) => {
    return userService.findOne(req.params.id)
        .then(user => {
            if (!user) {
                return next(new createError.NotFound("User is not found!"));
            }
            res.json(user);
        })
};


exports.update = (req, res, next) => {
    const _id = req.params.id;
    const { firstName, lastName, email, active, password, accesToken, role } = req.body;
    if (!firstName || !email) {
        return next(
            new createError.BadRequest("Missing properties!")
        );
    }

    const update = {
        firstName,
        lastName,
        email,
        highlighted,
        active,
        password,
        accesToken,
        role
    };

    return userService.update(req.params.id, update)
        .then(flower => {
            res.json(user);
        })
        .catch(err => {
            return next(new createError.InternalServerError(err.message));
        });
};

exports.delete = (req, res, next) => {
    return userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => {
            return next(new createError.InternalServerError(err.message));
        });
};