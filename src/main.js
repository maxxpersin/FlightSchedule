var clock, departureBody, arrivalBody;

function init() {
    clock = document.getElementById('clock');
    setInterval(renderTime, 1000);

    departureBody = document.getElementById('departures-body');
    arrivalBody = document.getElementById('arrivals-body');
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