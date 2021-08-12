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
        default: true
    },
    highlighted: Boolean,
    price: Number,
    image: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Flower', FlowerSchema);