
require('dotenv').config();

const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL

if (!mongoString) {
 throw new Error('DATABASE_URL environment variable is not set');
}

mongoose.connect(mongoString);

const db = mongoose.connection;

db.on('error', (error) => {
    console.log(error)
})

db.once('connected', () => {
    console.log('Database Connected');
})

module.exports = db;