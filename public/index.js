/* eslint-disable */
function updateDOM(dataObj) {
  console.log(dataObj);
  document.getElementById('app').innerHTML = '';
    var country = createEl('p', 'countryCode', dataObj.countryCode)
    var mapUrl = createEl('p', 'mapUrl', null, dataObj.mapUrl)//TODO: figure out how to show map
    var timestamp = createEl('p', 'time', dataObj.timestamp)//TODO: format time
    country.appendChild(mapUrl);
    country.appendChild(timestamp);
    var app = document.getElementById('app');
    app.appendChild(country);
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
      // console.log(request.responseText);
      var data = JSON.parse(request.responseText);
      // console.log(data);
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
