const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const AddressSchema = mongoose.Schema({
    zip: Number,
    country: String,
    city: String,
    street: String,
    houseNumber: Number
}, {
    timeStamps: true
});

AddressSchema.plugin(idValidator);

module.exports = mongoose.model('Address', AddressSchema);