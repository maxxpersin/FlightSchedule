var clock, clock2, departureBody, arrivalBody, arrivals = [], departures = [];

function init() {
    clock = document.getElementById('clock');
    clock2 = document.getElementById('clock2');
    setInterval(renderTime, 1000);

    departureBody = document.getElementById('departures-body');
    arrivalBody = document.getElementById('arrivals-body');

    fetch('http://localhost:3000/api/v1/flights')
        .then(response => response.json())
        .then(data => {
            initFlights(data);
        });

}

function initFlights(data) {
    arrivals = data.arrivals;
    departures = data.departures;

    arrivals.forEach(arrival => {
        arrivalBody.appendChild(document.createElement('tr'));
        arrivalBody.lastChild.classList.add(arrival.status == 'Delayed' ? 'text-danger' : (arrival.status == 'On-Time' ? 'text-success' : 'text-warning'))
        arrivalBody.lastChild
            .innerHTML = `<td>${arrival.airline}</td>
            <td>${arrival.num}</td>
            <td>${arrival.arrivingFrom}</td>
            <td>${arrival.schedTime.hour1}${arrival.schedTime.hour2}:${arrival.schedTime.min1}${arrival.schedTime.min2}</td>
            <td>${arrival.expectedTime.hour1}${arrival.expectedTime.hour2}:${arrival.expectedTime.min1}${arrival.expectedTime.min2}</td>
            <td>${arrival.gate}</td>
            <td>${arrival.status}</td>`
    });

    departures.forEach(departure => {
        departureBody.appendChild(document.createElement('tr'));
        departureBody.lastChild.classList.add(departure.status == 'Delayed' ? 'text-danger' : (departure.status == 'On-Time' ? 'text-success' : 'text-warning'))
        departureBody.lastChild
            .innerHTML = `<td>${departure.airline}</td>
            <td>${departure.num}</td>
            <td>${departure.departingTo}</td>
            <td>${departure.schedTime.hour1}${departure.schedTime.hour2}:${departure.schedTime.min1}${departure.schedTime.min2}</td>
            <td>${departure.expectedTime.hour1}${departure.expectedTime.hour2}:${departure.expectedTime.min1}${departure.expectedTime.min2}</td>
            <td>${departure.gate}</td>
            <td>${departure.status}</td>`
    });
}

function onTimeChange(time) { //Does all my updating

}

function renderTime() {
    let time = new Date();
    clock.textContent = time.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false
    });
    clock2.textContent = time.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false
    });
}

class Arrival {
    airline;
    num;
    arrivingFrom;
    schedTime;
    expectedTime;
    gate;
    status;

    constructor(init) {
        Object.assign(this, init);
    }
}

class Departure {
    airline;
    num;
    departingTo;
    schedTime;
    expectedTime;
    gate;
    status;

    constructor(init) {
        Object.assign(this, init);
    }
}

function closeHeader() {
    document.getElementById('nav').style.display = 'none';

}