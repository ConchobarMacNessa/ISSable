const coordinates = require('./getLongAndLat.js');

function serveAPI(cb) {
  return coordinates(cb);
}

module.exports = serveAPI;
