const request = require('request');
const formatTime = require('./formatTime.js');

function getMap(longandLat, cb) {
  const longitude = longandLat.longitude;
  const latitude = longandLat.latitude;
  const url = `https://api.wheretheiss.at/v1/coordinates/${latitude},${longitude}`;
  const time = Date.now();
  const formattedDate = formatTime(time);

  request(url, (err, res, body) => {
    if (err) {
      return err;
    }
    let data = {};
    const parsedBody = JSON.parse(body);
    // handle if over the ocean
    if (parsedBody.status === 404) {
      data = {
        countryCode: 'the Ocean',
        mapUrl: `https://maps.google.com/maps?q=${longitude},${latitude}&z=4`,
        timestamp: formattedDate,
      };
    } else {
      data = {
        countryCode: parsedBody.country_code,
        mapUrl: parsedBody.map_url,
        timestamp: formattedDate,
      };
    }
    cb(data);
  });
}

module.exports = getMap;
