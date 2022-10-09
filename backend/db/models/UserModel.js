const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    login: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    name: {
        required: true,
        type: String
    },
    city: {
        required: true,
        type: String
    },
    postalcode: {
        required: true,
        type: String
    },
    gender: {
        required: true,
        type: String
    },
    age: {
        required: true,
        type: Number
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('User', dataSchema)