const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    userid: {
        required: true,
        type: String
    },
    poolid: {
        required: true,
        type: String
    },
    optionid: {
        required: true,
        type: Number
    },
    age: {
        required: true,
        type: Number
    },
    gender: {
        required: true,
        type: String
    },
    timestamp: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('Vote', dataSchema);