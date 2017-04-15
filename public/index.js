/* eslint-disable */
function updateDOM(dataObj) {
    document.getElementById('app').innerHTML = '';
    var country = createEl('p', 'countryCode', 'The ISS is currently over ' + dataObj.countryCode)
    var mapUrl = createEl('p', 'mapUrl', null, dataObj.mapUrl);
    var timestamp = createEl('p', 'time', dataObj.timestamp);
    var longLat = {
        lat: dataObj.latitude,
        lng: dataObj.longitude
    };
    // initMap(longLat);
    country.appendChild(mapUrl);
    country.appendChild(timestamp);
    var app = document.getElementById('app');
    app.appendChild(country);
}

function initMap(positionObj) {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: positionObj
    });
    var marker = new google.maps.Marker({
        position: positionObj,
        map: map
    });
}

function createEl(element, className, text, url) {
    var el = document.createElement(element);
    el.className = className || '';
    el.textContent = text || '';
    if (url) el.href = url;
    return el;
}

function fetch(method, url, cb) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status === 200) {
            var data = JSON.parse(request.responseText);
            cb(data);
        }
    }
    request.onerror = function() {
        cb('Sorry, connection error');
    }
    request.open(method, url, true);
    request.send();
}

fetch('GET', 'http://localhost:4000/api', updateDOM);
