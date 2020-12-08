const mongoose = require('mongoose');
const Arrival = require('./models/arrival');
const Departure = require('./models/departure');

mongoose.connect('mongodb://localhost/flights', ({ useNewUrlParser: true, useUnifiedTopology: true }));
var db = mongoose.connection;

db.on('error', () => console.error('Could not connect'));
db.once('open', () => {
    console.log('Connection successful');
    main();
});

async function main() {
    await mongoose.connection.dropDatabase();

    let savedArrivals = await initArrivals();
    console.log(savedArrivals);

    let savedDepartures = await initDepartures();
    console.log(savedDepartures);

    await initTimes();
    //console.log(savedAll);

    process.exit();
}

async function initArrivals() {
    let arrivalArr = [
        {
            airline: 'American Airlines',
            num: 'AA 7781',
            arrivingFrom: 'ORD',
            schedTime: {
                hour1: 0,
                hour2: 9,
                min1: 3,
                min2: 0
            },
            expectedTime: {
                hour1: 0,
                hour2: 9,
                min1: 3,
                min2: 0
            },
            gate: 'C4',
            status: 'On-Time'
        },
        {
            airline: 'Delta',
            num: 'DL 642',
            arrivingFrom: 'MKE',
            schedTime: {
                hour1: 1,
                hour2: 3,
                min1: 1,
                min2: 0
            },
            expectedTime: {
                hour1: 1,
                hour2: 3,
                min1: 1,
                min2: 0
            },
            gate: 'A8',
            status: 'On-Time'
        },
        {
            airline: 'Frontier',
            num: 'F 8932',
            arrivingFrom: 'LAX',
            schedTime: {
                hour1: 1,
                hour2: 0,
                min1: 0,
                min2: 0
            },
            expectedTime: {
                hour1: 1,
                hour2: 0,
                min1: 0,
                min2: 0
            },
            gate: 'D1',
            status: 'On-Time'
        },
        {
            airline: 'United',
            num: 'U 103',
            arrivingFrom: 'MSP',
            schedTime: {
                hour1: 1,
                hour2: 6,
                min1: 4,
                min2: 5
            },
            expectedTime: {
                hour1: 1,
                hour2: 6,
                min1: 4,
                min2: 5
            },
            gate: 'A7',
            status: 'On-Time'
        },
        {
            airline: 'Southwest',
            num: 'S 1044',
            arrivingFrom: 'MSP',
            schedTime: {
                hour1: 1,
                hour2: 8,
                min1: 2,
                min2: 5
            },
            expectedTime: {
                hour1: 1,
                hour2: 8,
                min1: 2,
                min2: 5
            },
            gate: 'B4',
            status: 'On-Time'
        },
    ];

    return await Arrival.insertMany(arrivalArr);
}

async function initDepartures() {
    let departureArr = [
        {
            airline: 'American Airlines',
            num: 'AA 669',
            departingTo: 'ATL',
            schedTime: {
                hour1: 1,
                hour2: 0,
                min1: 4,
                min2: 3
            },
            expectedTime: {
                hour1: 1,
                hour2: 0,
                min1: 4,
                min2: 3
            },
            gate: 'C10',
            status: 'On-Time'
        },
        {
            airline: 'Delta',
            num: 'DL 773',
            departingTo: 'DAY',
            schedTime: {
                hour1: 1,
                hour2: 3,
                min1: 3,
                min2: 5
            },
            expectedTime: {
                hour1: 1,
                hour2: 3,
                min1: 3,
                min2: 5
            },
            gate: 'A11',
            status: 'On-Time'
        },
        {
            airline: 'Frontier',
            num: 'F 4329',
            departingTo: 'DEN',
            schedTime: {
                hour1: 1,
                hour2: 3,
                min1: 0,
                min2: 0
            },
            expectedTime: {
                hour1: 1,
                hour2: 3,
                min1: 0,
                min2: 0
            },
            gate: 'D6',
            status: 'On-Time'
        },
        {
            airline: 'United',
            num: 'U 196',
            departingTo: 'GRB',
            schedTime: {
                hour1: 1,
                hour2: 9,
                min1: 2,
                min2: 0
            },
            expectedTime: {
                hour1: 1,
                hour2: 9,
                min1: 2,
                min2: 0
            },
            gate: 'A11',
            status: 'On-Time'
        },
        {
            airline: 'Southwest',
            num: 'S 278',
            departingTo: 'PHX',
            schedTime: {
                hour1: 1,
                hour2: 4,
                min1: 0,
                min2: 5
            },
            expectedTime: {
                hour1: 1,
                hour2: 4,
                min1: 0,
                min2: 5
            },
            gate: 'B8',
            status: 'On-Time'
        },
    ];

    return await Departure.insertMany(departureArr);
}

async function initTimes() {
    let foundArrivals = await Arrival.find({}).catch(error => { });
    let foundDepartures = await Departure.find({}).catch(error => { });

    for (a of foundArrivals) {
        let time = new Date();

        if (a.status !== 'Landed') {
            if ((time.getHours() * 100) + (time.getMinutes()) >= (a.expectedTime.hour1 * 1000) + (a.expectedTime.hour2 * 100) + (a.expectedTime.min1 * 10) + (a.expectedTime.min2)) { // Current time is passed expected time
                a.status = 'Landed';
            } else {
                switch (getRandomInt(1, 5)) {
                    case 1:
                        a.expectedTime.min1 += 1;
                        a.status = 'Delayed';
                        break;
                }
            }
            await a.save().catch(error => { });
        }
    }

    for (d of foundDepartures) {
        let time = new Date();

        if (d.status !== 'Departed') {
            if ((time.getHours() * 100) + (time.getMinutes()) >= (d.expectedTime.hour1 * 1000) + (d.expectedTime.hour2 * 100) + (d.expectedTime.min1 * 10) + (d.expectedTime.min2)) { // Current time is passed expected time
                d.status = 'Departed';
            } else {
                switch (getRandomInt(1, 5)) {
                    case 1:
                        d.expectedTime.min1 += 1;
                        d.status = 'Delayed';
                        break;
                }
            }
            await d.save().catch(error => { });
        }
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}