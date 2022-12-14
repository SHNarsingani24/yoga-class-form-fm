const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    Email: { type: String, required: true, unique: true },
    ID: { type: String, required: true, unique: true },
    Name: { type: String, required: true },
    Batch: { type: String, required: true },
    Age: { type: Number, required: true }
});

const model = new mongoose.model('participant', schema, 'participants');

module.exports.user = model;