var clock, departureBody, arrivalBody, arrivals = [], departures = [];

function init() {
    clock = document.getElementById('clock');
    setInterval(renderTime, 1000);

    departureBody = document.getElementById('departures-body');
    arrivalBody = document.getElementById('arrivals-body');

    initFlights();
}

function initFlights() {
    for (let i = 0; i < 10; i++) {
        arrivals.push(new Arrival({
            airline: 'American Airlines',
            num: 'A 10',
            arrivingFrom: 'LAX',
            schedTime: '10:00',
            expectedTime: '10:10',
            gate: 'C19',
            status: 'On Time'
        }));

        arrivalBody.appendChild(document.createElement('tr'));
        arrivalBody.lastChild
            .innerHTML = `<td>${arrivals[i].airline}</td>
            <td>${arrivals[i].num}</td>
            <td>${arrivals[i].arrivingFrom}</td>
            <td>${arrivals[i].schedTime}</td>
            <td>${arrivals[i].expectedTime}</td>
            <td>${arrivals[i].gate}</td>
            <td>${arrivals[i].status}</td>`
    }

    for (let i = 0; i < 10; i++) {
        departures.push(new Departure({
            airline: 'American Airlines',
            num: 'Z 778',
            departingTo: 'MKE',
            schedTime: '15:00',
            expectedTime: '15:00',
            gate: 'A9',
            status: 'On Time'
        }));

        departureBody.appendChild(document.createElement('tr'));
        departureBody.lastChild
            .innerHTML = `<td>${departures[i].airline}</td>
            <td>${departures[i].num}</td>
            <td>${departures[i].departingTo}</td>
            <td>${departures[i].schedTime}</td>
            <td>${departures[i].expectedTime}</td>
            <td>${departures[i].gate}</td>
            <td>${departures[i].status}</td>`
    }
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