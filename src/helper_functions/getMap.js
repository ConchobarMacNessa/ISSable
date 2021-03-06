const request = require('request');
const formatTime = require('./formatTime.js');
const convertCountryCode = require('./convertCountryCode.js');

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
        mapUrl: `https://maps.google.com/maps?q=${latitude},${longitude}&z=4`,
        timestamp: formattedDate,
        longitude,
        latitude,
      };
    } else {
      const countryCode = parsedBody.country_code;
      const countryName = convertCountryCode(countryCode);
      data = {
        countryCode: countryName,
        mapUrl: parsedBody.map_url,
        timestamp: formattedDate,
        longitude,
        latitude,
      };
    }
    cb(data);
  });
}

module.exports = getMap;
