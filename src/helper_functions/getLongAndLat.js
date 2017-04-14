const request = require('request');
const getMap = require('./getMap.js');

function getLongAndLat(cb) {
  const url = 'https://api.wheretheiss.at/v1/satellites/25544';
  request(url, (err, res, body) => {
    if (err) {
      return err;
    }
    // console.log('££££ RES', res);
    const parsedBody = JSON.parse(body);
    const dataObj = {
      latitude: parsedBody.latitude,
      longitude: parsedBody.longitude,
      timestamp: parsedBody.timestamp,
    };
    getMap(dataObj, cb);
  });
}

module.exports = getLongAndLat;
