
const mongoose = require('mongoose');


const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: String,
    active: Boolean,
}, {
    timestamps: false,
    versionKey: false,
});

UserSchema.plugin(require('mongoose-bcrypt'));

module.exports = mongoose.model('User', UserSchema);

