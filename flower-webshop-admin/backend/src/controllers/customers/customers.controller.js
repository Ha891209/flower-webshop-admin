const createError = require('http-errors');

const customerService = require('../customers/customers.service');




//Create

exports.create = async (req, res, next) => {
    const { firstName, lastName, email, address, active } = req.body;
    if (!firstName || !lastName || !email || !address) {
        return next(
            new createError.BadRequest('Missing properties!')
        );
    }

    const newAddress = await addressService.create(address);

    if (!newAddress) {
        return next(
            new createError.InternalServerError('Address created failed. ')
        );
    }

    const newCustomer = {
        firstName,
        lastName,
        email,
        address: newAddress._id,
        active
    };

    return customerService.create(newCustomer)
        .then(cm => {
            res.status(201);
            res.json(cm);
        })
        .catch(err => next(new createError.InternalServerError(err.message)));
};

exports.findAll = (req, res, next) => {
    return customerService.findAll()
        .then(customers => {
            res.json(customers);
        });
}

exports.findOne = (req, res, next) => {
    return customerService.findOne(req.params.id)
        .then(customer => {
            if (!customer) {
                return next(new createError.NotFound("Customer is not found!"));
            }
            res.json(customer);
        })
};


exports.update = async (req, res, next) => {

    const { firstName, lastName, address, active } = req.body;
    if (!firstName || !lastName || !address) {
        return next(
            new createError.BadRequest("Missing properties!")
        );
    }

    const updatedAddress = await customerService.update(address._id, address);

    if (!updatedAddress) {
        return next(
            new createError.InternalServerError('Address updated failed. ')
        );
    }


    const update = {
        firstName,
        lastName,
        address: updatedAddress,
        active
    };


    return customerService.update(req.params.id, update)
        .then(customer => {
            res.json(customer);
        })
        .catch(err => {
            return next(new createError.InternalServerError(err.message));
        });
};

exports.delete = (req, res, next) => {
    return customerService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => {
            return next(new createError.InternalServerError(err.message));
        });
};