const serveAPI = require('../helper_functions/serveAPI.js');

module.exports = {
  method: 'GET',
  path: '/api',
  handler: (req, reply) => {
    serveAPI((data) => {
      reply(data);
    });
  },
};
