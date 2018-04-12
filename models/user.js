const mongoose = require('mongoose');
const bcrypt = require("bcrypt-nodejs");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    role: {
        default: 'user',
        type: String
    },
    password: {
        required: true,
        type: String
    },
    email: {
        required: true,
        unique: true,
        type: String
    },
    username: String,
    token: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

let User = mongoose.model('user', userSchema);

module.exports = User;