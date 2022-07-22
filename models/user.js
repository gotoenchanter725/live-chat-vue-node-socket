const { Schema, model } = require('mongoose')
const _ = require('lodash')
const bcrypt = require('bcryptjs')

let user_Schema = Schema({
    userName: {
        type: String,
        required: true,
        minLength: 5
    },
    mobileNumber: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    token : String
})


//pre
user_Schema.pre('save', function (next) {
    var user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
})

module.exports = new model('user', user_Schema)