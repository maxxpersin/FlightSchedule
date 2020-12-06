const mongoose = require('mongoose');

var departureSchema = mongoose.Schema({
    airline: String,
    num: String,
    departingTo: String,
    schedTime: {
        hour1: Number,
        hour2: Number,
        min1: Number,
        min2: Number
    },
    expectedTime: {
        hour1: Number,
        hour2: Number,
        min1: Number,
        min2: Number
    },
    gate: String,
    status: String
});

var Departure = mongoose.model('Departure', departureSchema);

module.exports = Departure;