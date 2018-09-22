var storageLocal = window.localStorage;
var historyData = [];
var cachedData = storageLocal.getItem('stopWatchData');

var startTime = undefined;
var stopTime = undefined;

/*
 *This is the function which loads the data stored in the local storage.
 */
function loadData() {
    if (cachedData) {
        historyData = JSON.parse(cachedData);
        renderData(historyData);
    } else {
        stopButtonsUpdate();
    }
}

/*
 * Given the cached data, this will start inserting the rows into the table
 */
function renderData(data) {
    if (data.length) {
        for (i = 0; i < data.length; i++) {
            insertRow(moment(data[i].time), data[i].latLong, data[i].elapsedTime, true);
        }
        // Button states need to be updated because we need to give user the ability to stop from the previous start :-)
        // Good edge case which I missed at start but could figure it out during testing.
        if (data.length % 2 !== 0) {
            // start condition
            startTime = moment(data[data.length - 1].time);
            startButtonsUpdate();
        } else {
            // stop condition
            stopButtonsUpdate();
        }
    }
}

/*
 * This function resolves the time to human readable format :)
 */
function change_to_readable(time) {
    var momentTimeDate = moment.duration(time)._data;
    var readableString = [];

    if (momentTimeDate.years) {
        readableString.push(momentTimeDate.years + ' Year' + (momentTimeDate.years > 1 ? 's' : ''));
    }
    if (momentTimeDate.months) {
        readableString.push(momentTimeDate.months + ' Month' + (momentTimeDate.months > 1 ? 's' : ''));
    }
    if (momentTimeDate.days) {
        readableString.push(momentTimeDate.days + ' Day' + (momentTimeDate.days > 1 ? 's' : ''));
    }
    if (momentTimeDate.hours) {
        readableString.push(momentTimeDate.hours + ' Hour' + (momentTimeDate.hours > 1 ? 's' : ''));
    }
    if (momentTimeDate.minutes) {
        readableString.push(momentTimeDate.minutes + ' Minute' + (momentTimeDate.minutes > 1 ? 's' : ''));
    }
    if (momentTimeDate.seconds) {
        readableString.push(momentTimeDate.seconds + ' Second' + (momentTimeDate.seconds > 1 ? 's' : ''));
    }
    if (momentTimeDate.milliseconds) {
        readableString.push(momentTimeDate.milliseconds + ' Milli-Second' + (momentTimeDate.milliseconds > 1 ? 's' : ''));
    }
    return readableString.join(' & ');
}

/*
 * This function creates rows in the HTML Table's body.
 */
function insertRow(time, latLong, elapsedTime, isCached) {
    if (!isCached) {
        historyData.push({'time': time, 'latLong': latLong, 'elapsedTime': elapsedTime});
        storageLocal.setItem('stopWatchData', JSON.stringify(historyData));
    }
    var table = document.getElementById("historyTableBody");
    var row = table.insertRow(-1);
    var timeColumn = row.insertCell(0);
    var coOrdinateColumn = row.insertCell(1);
    var elapsedTimeColumn = row.insertCell(2);

    timeColumn.innerHTML = time;
    coOrdinateColumn.innerHTML = latLong;
    var humanizedElapsedTime = change_to_readable(elapsedTime);
    elapsedTimeColumn.innerHTML = humanizedElapsedTime;
    document.getElementById("gpsStatus").innerHTML = "Ready";
}

function startButtonsUpdate() {
    document.getElementById("startBtn").disabled = true;
    document.getElementById("stopBtn").disabled = false;
}

function stopButtonsUpdate() {
    document.getElementById("startBtn").disabled = false;
    document.getElementById("stopBtn").disabled = true;
}

/*
 Function to add row to table when the timer is started
 */
function addStartToHistoryTable(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    startTime = moment();
    insertRow(startTime, latitude + ' & ' + longitude, 0, false);
    startButtonsUpdate();
}

/*
 Function to add row to table when the timer is stopped
 */
function addStopToHistoryTable(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    stopTime = moment();
    insertRow(stopTime, latitude + ' & ' + longitude, stopTime - startTime, false);
    stopButtonsUpdate();
}


function start() {
    document.getElementById("gpsStatus").innerHTML = "Searching..";
    navigator.geolocation.getCurrentPosition(addStartToHistoryTable, errorCallback);
}

function stop() {
    document.getElementById("gpsStatus").innerHTML = "Searching..";
    navigator.geolocation.getCurrentPosition(addStopToHistoryTable, errorCallback);
}

function errorCallback(error) {
    var gpsStatus = document.getElementById("gpsStatus");
    switch (error.code) {
        case error.PERMISSION_DENIED:
            gpsStatus.innerHTML = "Geo-location permission Denied";
            break;
        case error.POSITION_UNAVAILABLE:
            gpsStatus.innerHTML = "Geo-location information not available";
            break;
        case error.TIMEOUT:
            gpsStatus.innerHTML = "Geo-location timed-out";
            break;
        case error.UNKNOWN_ERROR:
            gpsStatus.innerHTML = "Geo-location unexpected error";
            break;
    }
}

/*
 This function Reset's entire table.
 */
function clearAll() {
    var tableBody = document.getElementById("historyTableBody");
    tableBody.innerHTML = '';
    storageLocal.removeItem('stopWatchData');
    historyData = [];
    cachedData = [];
    stopButtonsUpdate();
}