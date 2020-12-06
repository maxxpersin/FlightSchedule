var clock, clock2, departureBody, arrivalBody, arrivals = [], departures = [];

function init() {
    clock = document.getElementById('clock');
    clock2 = document.getElementById('clock2');
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

        if (i == 5) {
            arrivals[i].status = "Delayed";
        }

        arrivalBody.appendChild(document.createElement('tr'));
        arrivalBody.lastChild
            .innerHTML = `<td class="text-${arrivals[i].status == 'Delayed' ? 'danger' : 'black'}">${arrivals[i].airline}</td>
            <td class="text-${arrivals[i].status == 'Delayed' ? 'danger' : 'black'}">${arrivals[i].num}</td>
            <td class="text-${arrivals[i].status == 'Delayed' ? 'danger' : 'black'}">${arrivals[i].arrivingFrom}</td>
            <td class="text-${arrivals[i].status == 'Delayed' ? 'danger' : 'black'}">${arrivals[i].schedTime}</td>
            <td class="text-${arrivals[i].status == 'Delayed' ? 'danger' : 'black'}">${arrivals[i].expectedTime}</td>
            <td class="text-${arrivals[i].status == 'Delayed' ? 'danger' : 'black'}">${arrivals[i].gate}</td>
            <td class="text-${arrivals[i].status == 'Delayed' ? 'danger' : 'black'}">${arrivals[i].status}</td>`
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

        if (i == 5) {
            departures[i].status = "Delayed";
        }

        departureBody.appendChild(document.createElement('tr'));
        departureBody.lastChild
            .innerHTML = `<td class="text-${departures[i].status == 'Delayed' ? 'danger' : 'black'}">${departures[i].airline}</td>
            <td class="text-${departures[i].status == 'Delayed' ? 'danger' : 'black'}">${departures[i].num}</td>
            <td class="text-${departures[i].status == 'Delayed' ? 'danger' : 'black'}">${departures[i].departingTo}</td>
            <td class="text-${departures[i].status == 'Delayed' ? 'danger' : 'black'}">${departures[i].schedTime}</td>
            <td class="text-${departures[i].status == 'Delayed' ? 'danger' : 'black'}">${departures[i].expectedTime}</td>
            <td class="text-${departures[i].status == 'Delayed' ? 'danger' : 'black'}">${departures[i].gate}</td>
            <td class="text-${departures[i].status == 'Delayed' ? 'danger' : 'black'}">${departures[i].status}</td>`
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