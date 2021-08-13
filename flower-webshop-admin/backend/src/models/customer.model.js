const mongoose = require('mongoose');

const AddressSchema = mongoose.Schema({
    zip: Number,
    country: String,
    city: String,
    street: String,
    notes: String
   }, {
    timeStamps: true
});

const CustomerSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    address: {
        type: AddressSchema
    },
    active: Boolean,
}, {
    timestamps: true
});

module.exports = mongoose.model('Customer', CustomerSchema);