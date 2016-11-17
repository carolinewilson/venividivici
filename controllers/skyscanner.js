const request = require('request-promise');

function flights(req, res) {
  const baseUrl = 'http://partners.api.skyscanner.net/apiservices/browsequotes/v1.0/UK/GBP/en-GB/';

  request({
    method: 'GET',
    url: `${baseUrl}${req.query.origin}/${req.query.destination}/${req.query.departDate}/${req.query.returnDate}`,
    qs: {
      apiKey: process.env.SKYSCANNER_API_KEY
    },
    json: true
  })
  .then(function successCallback(response) {
    const totalPrice = response.Quotes.reduce((sum, currentQuote) => {
      return sum + currentQuote.MinPrice;
    }, 0);

    res.json({ totalPrice });
  })
  .catch(function errorCallback(response) {
    res.status(500).json(response);
  });
}

module.exports = {
  flights
};
