const request = require('request');

var getWeather = (lat, lon) => {
    return new Promise((resolve, reject) => {
        request({
            url: 'https://api.darksky.net/forecast/26a980078d8a85153f376d0a0cbe2269/' + encodeURIComponent(lat) + ',' + encodeURIComponent(lon),
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