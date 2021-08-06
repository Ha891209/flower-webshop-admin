const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flower',
    },
    customerId: Number,
    amount: Number,
    status: String
}, {
    timeStamps: true
});

module.exports = mongoose.model('Order', OrderSchema);