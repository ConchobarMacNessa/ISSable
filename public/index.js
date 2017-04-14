/* eslint-disable */
function updateDOM(dataArr) {
  document.getElementById('app').innerHTML = '';
  dataArr.forEach(function(data) {
    var country = createEl('p', 'countryCode', data.countryCode)
    var mapUrl = createEl('p', 'mapUrl', null, data.mapUrl)//TODO: figure out how to show map
    var timestamp = createEl('p', 'time', data.timestamp)//TODO: format time
    country.appendChild(mapUrl);
    country.appendChild(timestamp);
    var app = document.getElementById('app');
    app.appendChild(country);
  })
}

function createEl(element, className, text, url) {
  var el = document.createElement(element);
  el.className = className || '';
  el.textContent = text || '';
  if (url) el.href = url;
  return el;
}

function fetch(method, url, cb){
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState === 4 && request.status === 200) {
      console.log(request.status);
      var data = JSON.stringify(request.responseText);
      console.log(data);
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
