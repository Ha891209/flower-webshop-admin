const createError = require('http-errors');
const orderService = require('./order.service');
const flowerService = require('../flowers/flowers.service');

exports.findAll = (req, res, next) => {
    return orderService.findAll()
        .then(orders => {
            res.json(orders);
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
    const { flower } = req.body;
    if (!req.body.customerId || !req.body.amount || !req.body.status || !flower) {
        return next(new createError.BadRequest("Request body must contain amount, status parameters"));
    }

    const newFlower = await flowerService.create(flower);

    if (!newFlower) {
        return next(
            new createError.InternalServerError('Flower created failed. ')
        );
    }

    const orderData = {
        flower: newFlower._id,
        customerId: req.body.customerId,
        amount: req.body.amount,
        status: req.body.status,
    };

    return orderService.create(orderData)
        .then(createdOrder => {
            res.status(201);
            res.json(createdOrder);
        })
        .catch(err => next(new createError.InternalServerError(err.message)));
}


exports.update = async (req, res, next) => {

    const { customerId, amount, status } = req.body;
    if (!customerId || !amount || !status) {
        return next(
            new createError.BadRequest("Missing properties!")
        );
    }

    return orderService.update(req.params.id, req.body)
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