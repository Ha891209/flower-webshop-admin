const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    flower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flower',
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
    },
    amount: Number,
    status: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', OrderSchema);