const mongoose = require('mongoose');

const FlowerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: false,
        default: true
    },
    highlighted: Boolean,
    price: {
        type: Number,
        required: true
    },
    image: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Flower', FlowerSchema);