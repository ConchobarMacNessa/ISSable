const request = require('request');

function getMap(longandLat) {
  const longitude = longandLat.longitude;
  const latitude = longandLat.latitude;
  const url = `https://api.wheretheiss.at/v1/coordinates/${latitude},${longitude}`;
  request(url, (err, res, body) => {
    if (err) {
      return err;
    }
    let data = {};
    const parsedBody = JSON.parse(body);
    // handle if over the ocean
    if (parsedBody.status === 404) {
      data = {
        countryCode: 'The Ocean',
        mapUrl: `https://maps.google.com/maps?q=${longitude},${latitude}&z=4`,
        timestamp: longandLat.timestamp,
      };
    } else {
      data = {
        countryCode: parsedBody.country_code,
        mapUrl: parsedBody.map_url,
        timestamp: longandLat.timestamp,
      };
    }
    console.log(data);
    return data;
  });
}

module.exports = getMap;
