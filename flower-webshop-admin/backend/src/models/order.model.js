const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    flower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flower',
    },
    customerId: Number,
    amount: Number,
    status: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', OrderSchema);