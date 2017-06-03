const request = require('request');
const math = require('mathjs');

// To use your Secret Key from Dark Sky
const apiKey = 'fc3ae4320dcf53edd129d05864570f3e'

var getWeather = (lat, lng, callback) => {
  request({
    url: `https://api.darksky.net/forecast/${apiKey}/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
    if(error) {
      callback('Unable to connect to Forecast.io server.');
    } else if (response.statusCode === 403) {
      callback('Please check your api key.');
    } else if (response.statusCode === 404) {
      callback('Unable to fetch weather.');
    } else if (response.statusCode === 200) {
      callback(undefined, {
          temperature: math.round((body.currently.temperature - 32) * 5 / 9, 2),
          apparentTemperature: math.round((body.currently.apparentTemperature - 32) * 5 /9, 2)
      })
    }
  });
};

module.exports.getWeather = getWeather;
