const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    batch_id: { type: String, required: true },
    participant_id: { type: String, required: true }
});

const model = new mongoose.model('batch', schema, 'batches');

module.exports.batch = model;