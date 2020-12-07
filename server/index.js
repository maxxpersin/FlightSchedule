const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Arrival = require('./models/arrival');
const Departure = require('./models/departure');

mongoose.connect('mongodb://localhost/flights', ({ useNewUrlParser: true, useUnifiedTopology: true }));
var db = mongoose.connection;

db.on('error', () => console.error('Could not connect'));
db.once('open', () => console.log('Connction successful'));

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => console.log(`Flight Schedule is live on port ${port}`));

app.use(express.static('public'));

app.get('/api/v1/flights', async (req, res) => {
    let data = { arrivals: undefined, departures: undefined };

    data.arrivals = await Arrival.find({}).catch(error => { });
    data.departures = await Departure.find({}).catch(error => { });

    res.json(data);
});


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}