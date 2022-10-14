const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    userid: {
        required: true,
        type: String
    },
    pollid: {
        required: true,
        type: String
    },
    optionid: {
        required: true,
        type: Number
    },
    timestamp: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('Vote', dataSchema);