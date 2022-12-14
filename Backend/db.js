const mongoose = require('mongoose');
require('dotenv').config()
// console.log('Hello there');

mongoose.set('strictQuery', false);
const server = process.env.DATABASE
const db = mongoose.connect(server)
    .then('Connected to database successfully!!!')
    .catch(err => console.log(`Couldn't connect to database: ${err}`));

module.exports.db = db;