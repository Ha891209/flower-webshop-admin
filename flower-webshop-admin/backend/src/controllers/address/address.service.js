const Address = require('../../models/address.model');
const Customer = require('../../models/customer.model');

exports.create = async addressData => {
    const address = new Address(addressData);
    return await address.save();
};

exports.findAll = () => Address.find();

exports.findOne = id => Address
    .findById(id)
    .populate('resident');

exports.update = (id, updateData) => Address.findByIdAndUpdate(id, updateData, { new: true });

exports.delete = (id) => Address.findByIdAndRemove(id);