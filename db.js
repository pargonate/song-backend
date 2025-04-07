require('dotenv').config();

const DB_USER = 'pargonate';
const DB_PASSWORD = process.env.DB_PASSWORD;

const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@songDB.fmj3alp.mongodb.net/?retryWrites=true&w=majority&appName=songDB`);

module.exports = mongoose