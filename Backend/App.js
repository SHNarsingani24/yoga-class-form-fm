const express = require('express');
const cors = require('cors');
const uniqid = require('uniqid');
const mongoose = require('mongoose');
const { batch } = require('./model/batch');
const { user } = require('./model/participant');
require('./db');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ credentials: true, origin: 'https://yoga-class-fm.onrender.com' }));

const db = mongoose.connection;

app.get('/payment', (req, res) => {
    const paid = Math.random();
    if (paid >= 0.9)
        res.json({ msg: "Failed" }).status(400).end();
    else {
        res.json({ msg: "Done" }).status(200).end();
    }
});

app.post('/enroll', (req, res) => {
    const t = req.body.Batch;
    console.log(t);
    const p = new user({
        ID: uniqid(),
        Email: req.body.Email,
        Name: req.body.Name,
        Batch: req.body.Batch,
        Age: req.body.Age
    });

    batch.update({ Timing: t }, { $inc: { Participants: 1 } }, (err, doc) => console.log(err));
    p.save().then(doc => console.log(doc));
});

app.listen(3001, () => console.log('Listening @PORT: 3001'));