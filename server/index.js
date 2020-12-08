const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Arrival = require('./models/arrival');
const Departure = require('./models/departure');

var currTime;
var time = {};

updateDate();

mongoose.connect('mongodb://localhost/flights', ({ useNewUrlParser: true, useUnifiedTopology: true }));
var db = mongoose.connection;

db.on('error', () => console.error('Could not connect'));
db.once('open', () => console.log('Connction successful'));

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => console.log(`Flight Schedule is live on port ${port}`));

app.use(express.static('public'));

var timer = setInterval(async () => {
    await updateDate();
}, 1000 * 60);

app.get('/api/v1/flights', async (req, res) => {
    let data = { arrivals: undefined, departures: undefined };

    if (req.query.t) {
        if (timer) clearInterval(timer);

        await updateDateCustom(req.query.t);
    }

    data.arrivals = await Arrival.find({}).catch(error => { });
    data.departures = await Departure.find({}).catch(error => { });

    res.json(data);
});


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

async function updateDateCustom(customTime) {
    let sections = customTime.split(':');
    let hour = Number(sections[0]);
    let min = Number(sections[1]);

    let foundArrivals = await Arrival.find({}).catch(error => { });
    let foundDepartures = await Departure.find({}).catch(error => { });

    for (a of foundArrivals) {
        if (a.status !== 'Landed') {
            if ((hour * 100) + (min) >= (a.expectedTime.hour1 * 1000) + (a.expectedTime.hour2 * 100) + (a.expectedTime.min1 * 10) + (a.expectedTime.min2)) { // Current time is passed expected time
                a.status = 'Landed';
            }
            await a.save().catch(error => { });
        }
    }

    for (d of foundDepartures) {
        if (d.status !== 'Departed') {
            if ((hour * 100) + (min) >= (d.expectedTime.hour1 * 1000) + (d.expectedTime.hour2 * 100) + (d.expectedTime.min1 * 10) + (d.expectedTime.min2)) { // Current time is passed expected time
                d.status = 'Departed';
            }
            await d.save().catch(error => { });
        }
    }
}

async function updateDate() {
    currTime = new Date();

    if (currTime.getHours() < 10) {
        time.hour1 = 0;
        time.hour2 = currTime.getHours();
    } else {
        time.hour1 = Number(currTime.getHours().toString()[0]);
        time.hour2 = Number(currTime.getHours().toString()[1]);
    }

    if (currTime.getMinutes() < 10) {
        time.min1 = 0;
        time.min2 = currTime.getMinutes();
    } else {
        time.min1 = Number(currTime.getMinutes().toString()[0]);
        time.min2 = Number(currTime.getMinutes().toString()[1]);
    }

    let foundArrivals = await Arrival.find({}).catch(error => { });
    let foundDepartures = await Departure.find({}).catch(error => { });

    for (a of foundArrivals) {
        if (a.status !== 'Landed') {
            if ((currTime.getHours() * 100) + (currTime.getMinutes()) >= (a.expectedTime.hour1 * 1000) + (a.expectedTime.hour2 * 100) + (a.expectedTime.min1 * 10) + (a.expectedTime.min2)) { // Current time is passed expected time
                a.status = 'Landed';
            }
            await a.save().catch(error => { });
        }
    }

    for (d of foundDepartures) {
        if (d.status !== 'Departed') {
            if ((currTime.getHours() * 100) + (currTime.getMinutes()) >= (d.expectedTime.hour1 * 1000) + (d.expectedTime.hour2 * 100) + (d.expectedTime.min1 * 10) + (d.expectedTime.min2)) { // Current time is passed expected time
                d.status = 'Departed';
            }
            await d.save().catch(error => { });
        }
    }
}