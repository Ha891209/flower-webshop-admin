const express = require('express');
const createError = require('http-errors');

const userService = require('./users.service');

exports.create = (req, res, next) => {
    const { email, password, active } = req.body;
    if (!email || !password || !active) {
        return next(
            new createError.BadRequest("Missing properties!")
        );
    }

    const newUser = {

        email: email,
        password: password,
        active: active
    };

    return userService.create(newUser)
        .then(cp => {
            res.status(201);
            res.json(cp);
        })
        .catch(err => next(new createError.InternalServerError(err.message)));
};

exports.findAll = (req, res, next) => {
    return userService.findAll()
        .then(user => {
            res.json(user);
        });
};

exports.findOne = (req, res, next) => {
    return userService.findOne(req.params.id)
        .then(user => {
            if (!user) {
                return next(new createError.NotFound("User is not found"));
            }
            return res.json(user);
        });
};

exports.update = (req, res, next) => {
    const id = req.params.id;
    const { email, password, active } = req.body;
    if (!email || !password || !active) {
        return next(
            new createError.BadRequest("Missing properties!")
        );
    }

    const update = {
        email: email,
        password: password,
        active: active
    };
    return userService.update(req.params.id, update)
        .then(user => {
            res.json(user);
        })
        .catch(err => {
            next(new createError.InternalServerError(err.message));
        });
};

exports.delete = (req, res, next) => {
    return userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => {
            next(new createError.InternalServerError(err.message));
        });
};