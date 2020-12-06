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
        arrivalBody.lastChild
            .innerHTML = `<td class="text-${arrival.status == 'Delayed' ? 'danger' : 'black'}">${arrival.airline}</td>
            <td class="text-${arrival.status == 'Delayed' ? 'danger' : 'black'}">${arrival.num}</td>
            <td class="text-${arrival.status == 'Delayed' ? 'danger' : 'black'}">${arrival.arrivingFrom}</td>
            <td class="text-${arrival.status == 'Delayed' ? 'danger' : 'black'}">${arrival.schedTime.hour1}${arrival.schedTime.hour2}:${arrival.schedTime.min1}${arrival.schedTime.min2}</td>
            <td class="text-${arrival.status == 'Delayed' ? 'danger' : 'black'}">${arrival.expectedTime.hour1}${arrival.expectedTime.hour2}:${arrival.expectedTime.min1}${arrival.expectedTime.min2}</td>
            <td class="text-${arrival.status == 'Delayed' ? 'danger' : 'black'}">${arrival.gate}</td>
            <td class="text-${arrival.status == 'Delayed' ? 'danger' : 'black'}">${arrival.status}</td>`
    });

    departures.forEach(departure => {
        departureBody.appendChild(document.createElement('tr'));
        departureBody.lastChild
            .innerHTML = `<td class="text-${departure.status == 'Delayed' ? 'danger' : 'black'}">${departure.airline}</td>
            <td class="text-${departure.status == 'Delayed' ? 'danger' : 'black'}">${departure.num}</td>
            <td class="text-${departure.status == 'Delayed' ? 'danger' : 'black'}">${departure.departingTo}</td>
            <td class="text-${departure.status == 'Delayed' ? 'danger' : 'black'}">${departure.schedTime.hour1}${departure.schedTime.hour2}:${departure.schedTime.min1}${departure.schedTime.min2}</td>
            <td class="text-${departure.status == 'Delayed' ? 'danger' : 'black'}">${departure.expectedTime.hour1}${departure.expectedTime.hour2}:${departure.expectedTime.min1}${departure.expectedTime.min2}</td>
            <td class="text-${departure.status == 'Delayed' ? 'danger' : 'black'}">${departure.gate}</td>
            <td class="text-${departure.status == 'Delayed' ? 'danger' : 'black'}">${departure.status}</td>`
    })

    // for (let i = 0; i < 10; i++) {
    //     arrivals.push(new Arrival({
    //         airline: 'American Airlines',
    //         num: 'A 10',
    //         arrivingFrom: 'LAX',
    //         schedTime: '10:00',
    //         expectedTime: '10:10',
    //         gate: 'C19',
    //         status: 'On Time'
    //     }));

    //     if (i == 5) {
    //         arrival.status = "Delayed";
    //     }

    //     arrivalBody.appendChild(document.createElement('tr'));
    //     arrivalBody.lastChild
    //         .innerHTML = `<td class="text-${arrival.status == 'Delayed' ? 'danger' : 'black'}">${arrival.airline}</td>
    //         <td class="text-${arrival.status == 'Delayed' ? 'danger' : 'black'}">${arrival.num}</td>
    //         <td class="text-${arrival.status == 'Delayed' ? 'danger' : 'black'}">${arrival.arrivingFrom}</td>
    //         <td class="text-${arrival.status == 'Delayed' ? 'danger' : 'black'}">${arrival.schedTime}</td>
    //         <td class="text-${arrival.status == 'Delayed' ? 'danger' : 'black'}">${arrival.expectedTime}</td>
    //         <td class="text-${arrival.status == 'Delayed' ? 'danger' : 'black'}">${arrival.gate}</td>
    //         <td class="text-${arrival.status == 'Delayed' ? 'danger' : 'black'}">${arrival.status}</td>`
    // }

    // for (let i = 0; i < 10; i++) {
    //     departures.push(new Departure({
    //         airline: 'American Airlines',
    //         num: 'Z 778',
    //         departingTo: 'MKE',
    //         schedTime: '15:00',
    //         expectedTime: '15:00',
    //         gate: 'A9',
    //         status: 'On Time'
    //     }));

    //     if (i == 5) {
    //         departure.status = "Delayed";
    //     }

    //     departureBody.appendChild(document.createElement('tr'));
    //     departureBody.lastChild
    //         .innerHTML = `<td class="text-${departure.status == 'Delayed' ? 'danger' : 'black'}">${departure.airline}</td>
    //         <td class="text-${departure.status == 'Delayed' ? 'danger' : 'black'}">${departure.num}</td>
    //         <td class="text-${departure.status == 'Delayed' ? 'danger' : 'black'}">${departure.departingTo}</td>
    //         <td class="text-${departure.status == 'Delayed' ? 'danger' : 'black'}">${departure.schedTime}</td>
    //         <td class="text-${departure.status == 'Delayed' ? 'danger' : 'black'}">${departure.expectedTime}</td>
    //         <td class="text-${departure.status == 'Delayed' ? 'danger' : 'black'}">${departure.gate}</td>
    //         <td class="text-${departure.status == 'Delayed' ? 'danger' : 'black'}">${departure.status}</td>`
    // }
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