const mongoose = require('mongoose');

var arrivalSchema = mongoose.Schema({
    airline: String,
    num: String,
    arrivingFrom: String,
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

var Arrival = mongoose.model('Arrival', arrivalSchema);

module.exports = Arrival;