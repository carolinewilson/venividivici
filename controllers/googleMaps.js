const request = require('request-promise');

function maps(req, res) {
  const baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json';

  request({
    method: 'GET',
    url: baseUrl,
    qs: {
      key: process.env.GOOGLE_PROJECT3_API_KEY,
      address: req.query.destination
    },
    json: true
  })
  .then(function successCallback(response) {
    res.json(response.results[0].geometry.location);
  })
  .catch(function errorCallback(response) {
    res.status(500).json(response);
  });
}

module.exports = {
  maps
};
