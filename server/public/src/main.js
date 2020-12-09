var clock, clock2, departureBody, arrivalBody, arrivals = [], departures = [], setTime = '', clockInterval, incoming, outbound;

var currScreen = 0;

function init() {
    incoming = document.getElementById('incoming');
    outbound = document.getElementById('outbound');
    outbound.style.display = 'none';

    clock = document.getElementById('clock');
    clock2 = document.getElementById('clock2');

    clockInterval = setInterval(renderTime, 1000);

    departureBody = document.getElementById('departures-body');
    arrivalBody = document.getElementById('arrivals-body');

    fetch('http://localhost:3000/api/v1/flights')
        .then(response => response.json())
        .then(data => {
            initFlights(data);
        });

}

function initFlights(data) {

    arrivalBody.innerHTML = '';

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

    departureBody.innerHTML = '';

    departures.forEach(departure => {
        departureBody.appendChild(document.createElement('tr'));
        departureBody.lastChild.classList.add(departure.status == 'Delayed' ? 'text-danger' : (departure.status == 'On-Time' ? 'text-success' : (departure.status == 'Departed' ? 'text-warning' : 'text-primary')))
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

    if (time.getSeconds() % 15 == 0) {
        fetch('http://localhost:3000/api/v1/flights')
            .then(response => response.json())
            .then(data => {
                initFlights(data);
            });
    }
}

function renderCustom() {
    clock.textContent = setTime;
    clock2.textContent = setTime;

    if (Number(setTime.split(':')[2]) % 15 == 0) {
        fetch(`http://localhost:3000/api/v1/flights?t=${setTime}`)
            .then(response => response.json())
            .then(data => {
                initFlights(data);
            });
    }

    let sections = setTime.split(':');
    sections[2] = Number(sections[2]) + 1;
    if (sections[2] <= 9) {
        sections[2] = `0${sections[2]}`;
    } else if (sections[2] == 60) {
        sections[2] = '00';
        sections[1] = Number(sections[1]) + 1;

        if (sections[1] <= 9) {
            sections[1] = `0${sections[1]}`
        } else if (sections[1] == 60) {
            sections[1] = '00';
            sections[0] = Number(sections[0]) + 1;

            if (sections[0] <= 9) {
                sections[0] = `0${sections[0]}`
            } else if (sections[0] == 24) {
                sections[0] = '00';
            }
        }
    }

    setTime = `${sections[0]}:${sections[1]}:${sections[2]}`;
}

function showOutbound() {
    incoming.style.display = 'none';
    outbound.style.display = 'block';
}

function showIncoming() {
    outbound.style.display = 'none';
    incoming.style.display = 'block';
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

function forward(newTime) {
    setTime = newTime + ':00';
    clearInterval(clockInterval);

    setInterval(renderCustom, 1000);
}