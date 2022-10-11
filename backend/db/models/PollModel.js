const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    author: {
        required: true,
        type: String
    },
    title: {
        required: true,
        type: String
    },
    description: {
        default: "",
        type: String
    },
    options: {
        required: true,
        type: Array
    },
    tags: {
        default: [],
        type: Array
    },
    resultsPublic: {
        default: true,
        type: Boolean
    },
    isPinned: {
        default: false,
        type: Boolean
    },
    range: {
        required: true,
        type: String
    },
    city: {
        required: true,
        type: String
    },
    cityid: {
        required: true,
        type: String
    },
    timestamp: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('Region', dataSchema, 'regions');