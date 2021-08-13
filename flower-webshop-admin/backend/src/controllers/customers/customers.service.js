const Customer = require('../../models/customer.model');


exports.create = async (customerData) => {
    const customer = new Customer(customerData);
    return await customer.save();
};

exports.findAll = () => Customer.find();

exports.findOne = id => Customer.findById(id);

exports.findOneAndActive = () => Customer.find({ 'orders.status': 'shipped' });

exports.update = (id, updateData) => Customer.findByIdAndUpdate(id, updateData, { new: true }).populate('address');

exports.delete = (id) => Customer.findByIdAndRemove(id);