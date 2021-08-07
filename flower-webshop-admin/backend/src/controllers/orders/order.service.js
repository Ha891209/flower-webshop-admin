const Order = require('../../models/order.model');
const Customer = require('../../models/customer.model');

exports.create = async orderData => {
    const order = new Order(orderData);
    return await order.save();
};

exports.findAll = () => Order.find().populate('Flower');

exports.findOne = id => Order
    .findById(id)
    .populate('Flower');

exports.update = (id, updateData) => Order.findByIdAndUpdate(id, updateData, { new: true });

exports.delete = (id) => Order.findByIdAndRemove(id);