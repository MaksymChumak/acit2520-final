const request = require('request');

let getWeather = (lat, lng) => {
  return new Promise((resolve, reject) => {
    request({
      url: `https://api.darksky.net/forecast/8a5dd1c4eb42e4a8a52176becebbd67a/${lat},${lng}`,
      json: true
    }, (error, response, body) => {
      if(error) {
        reject('Cannot connect to Dark Sky.');
      }
      else if(body.code == 400) {
        reject('The given location is invalid.');
      }
      else {
        resolve({
            status: body.currently.summary,
            temp: body.currently.temperature
        });
      }
    });
  });
};

module.exports = {
  getWeather
}