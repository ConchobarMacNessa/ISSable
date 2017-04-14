const coordinates = require('./getLongAndLat.js');

function serveAPI() {
  return coordinates();
}

module.exports = serveAPI;
