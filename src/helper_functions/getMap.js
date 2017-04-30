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
        mapUrl: `https://maps.googleapis.com/maps/api/staticmap?size=764x400&center=${latitude},${longitude}&zoom=3&markers=${latitude},${longitude}`,
        timestamp: formattedDate,
        longitude,
        latitude,
      };
    } else {
      const countryCode = parsedBody.country_code;
      const countryName = convertCountryCode(countryCode);
      data = {
        countryCode: countryName,
        mapUrl: `https://maps.googleapis.com/maps/api/staticmap?size=764x400&center=${latitude},${longitude}&zoom=3&markers=${latitude},${longitude}`,
        timestamp: formattedDate,
        longitude,
        latitude,
      };
    }
    cb(data);
  });
}

module.exports = getMap;
