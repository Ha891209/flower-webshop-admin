const express = require('express');
const createError = require('http-errors');

const flowwerService = require('./flowers.service');

//Create

exports.create = (req, res, next) => {
    const { name, description, active, highlighted, price, image } = req.body;
    if (!title /* || !category || !rating */) {
        return next(
            new createError.BadRequest('Missing properties!')
        );
    }

    const newFlower = {
        name,
        description,
        active,
        highlighted,
        price,
        image
    };

    return flowerService.create(newFlower)
        .then(createdFlower => {
            res.status(201);
            res.json(createdFlower);
        })
        .catch(err => next(new createError.InternalServerError(err.message)));
};

exports.findAll = (req, res, next) => {
    return flowerService.findAll()
        .then(flowers => {
            res.json(flowers);
        });
}

exports.findOne = (req, res, next) => {
    return flowerService.findOne(req.params.id)
        .then(flower => {
            if (!flower) {
                return next(new createError.NotFound("Movie is not found!"));
            }
            res.json(flower);
        })
};


exports.update = (req, res, next) => {
    const _id = req.params.id;
    const { name, description, active, highlighted, price, image } = req.body;
    if (!name || !description) {
        return next(
            new createError.BadRequest("Missing properties!")
        );
    }

    const update = {
        name,
        description,
        active,
        highlighted,
        price,
        image
    };

    return flowerService.update(req.params.id, update)
        .then(flower => {
            res.json(flower);
        })
        .catch(err => {
            return next(new createError.InternalServerError(err.message));
        });
};

exports.delete = (req, res, next) => {
    return flowerService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => {
            return next(new createError.InternalServerError(err.message));
        });
};