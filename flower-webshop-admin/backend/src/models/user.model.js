
const mongoose = require('mongoose');


const UserSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    },
    active: Boolean,
    password: String,
    accessToken: String,
    role: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);

