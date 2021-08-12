const express = require('express');
const createError = require('http-errors');
const orderService = require('./order.service');

exports.findAll = (req, res, next) => {
    return orderService.findAll()
        .then(order => {
            res.json(order);
        });
}

exports.findOne = (req, res, next) => {
    return orderService.findOne(req.params.id)
        .then(order => {
            if (!order) {
                return next(new createError.NotFound("Order is not found"));
            }

            res.json(order);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return next(new createError.NotFound("Order is not found"));
            } else {
                return next(new createError.InternalServerError(err.message));
            }
        });
}

exports.create = async (req, res, next) => {
    const { flowers, customerId, amount, status } = req.body;
    if (!flowers || !customerId || !amount || !status) {
        return next(
            new createError.BadRequest("Missing properties!")
        );
    }

    const orders = await orderService.findAll();
    const sortedOrders = [...orders].sort((a, b) => a._id > b._id);
    const id = sortedOrders[sortedOrders.length - 1]._id + 1;

    const newOrder = {
        _id: id,
        flowers: newFlower._id,
        customerId: req.body.customerId,
        amount: req.body.amount,
        status: req.body.status,
    };

    return orderService.create(newOrder)
        .then(createdOrder => {
            res.status(201);
            res.json(createdOrder);
        })
        .catch(err => next(new createError.InternalServerError(err.message)));
}


exports.update = async (req, res, next) => {

    const { flower, customerId, amount, status } = req.body;
    if (!flower || !customerId || !amount || !status) {
        return next(
            new createError.BadRequest("Missing properties!")
        );
    }

    return orderService.update(id, update)
        .then(order => {
            res.json(order);
        })
        .catch(err => {
            return next(new createError.InternalServerError(err.message));
        });
};


exports.delete = (req, res, next) => {
    return orderService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => {
            return next(new createError.InternalServerError(err.message));
        });
};