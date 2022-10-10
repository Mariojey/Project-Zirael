const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    POZIOM: {
        type: String
    },
    REGION: {
        type: String
    },
    WOJ: {
        type: String
    },
    PODREG: {
        type: String
    },
    POW: {
        type: String
    },
    GMI: {
        type: String
    },
    RODZ: {
        type: String
    },
    NAZWA: {
        type: String
    },
    NAZWA_DOD: {
        type: String
    },
    STAN_NA: {
        type: String
    }
})

module.exports = mongoose.model('Region', dataSchema, 'regions');