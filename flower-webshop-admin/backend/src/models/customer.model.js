const mongoose = require('mongoose');


const CustomerSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    // address: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Address'
    // },
    active: Boolean,
}, {
    timestamps: true
});

module.exports = mongoose.model('Customer', CustomerSchema);