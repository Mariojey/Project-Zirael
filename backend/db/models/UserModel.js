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
    description: {
        type: String,
        default: ""
    },
    city: {
        required: true,
        type: String
    },
    cityid: {
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
    profileColor: {
        type: String,
        default: `#${Math.floor(Math.random()*16777215).toString(16)}`
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