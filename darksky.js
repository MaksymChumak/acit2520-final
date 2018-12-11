require('dotenv').config();
const request = require('request');
const google_map_key = process.env.GOOGLE_MAP_KEY;
const darksky_key = process.env.DARKSKY_KEY;

/*
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
*/

let getLocation = (location) => {
  return new Promise((resolve, reject) => {
    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${google_map_key}`,
      json: true
    }, (error, response, body) => {
      if (error) {
        reject(error);
      } else if (body.status === 'ZERO_RESULTS') {
        reject(error);
      } else if (body.status === 'OK') {
        let result = {
          "lat": body.results[0].geometry.location.lat,
          "lng": body.results[0].geometry.location.lng
        }
        console.log(result)
        resolve(result);
      }
    });
  });
}

let getWeather = (coordinates) => {
  return new Promise(async(resolve, reject) => {
    request({
      url: `https://api.darksky.net/forecast/${darksky_key}/${coordinates['lat']},${coordinates['lng']}`,
      json: true
    }, (error, response, body) => {
      if (!error) {
        resolve({
          "summary": body.daily.data[0].summary,
          "temp": body.currently.temperature,
          "icon": body.currently.icon
        });
      } else {
        reject(error);
      }
    });
  });
}


module.exports = {
  getWeather: getWeather,
  getLocation: getLocation,
}