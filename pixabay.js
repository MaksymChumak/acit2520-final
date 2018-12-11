const request = require('request');
const pixabay_key = process.env.PIXABAY_KEY;
require('dotenv').config();

let getGallery = (picturetype) => {
  return new Promise((resolve, reject) => {
    request({
      url: `https://pixabay.com/api/?key=${pixabay_key}&q=${encodeURIComponent(picturetype)}&image_type=photo`,
      json: true
    }, (error, response, body) => {
      resolve({
        'pic1': `<img class=pictures src=${body.hits[0].largeImageURL}>`,
        'pic2': `<img class=pictures src=${body.hits[1].largeImageURL}>`,
        'pic3': `<img class=pictures src=${body.hits[2].largeImageURL}>`,
        'pic4': `<img class=pictures src=${body.hits[3].largeImageURL}>`
      });
    })
  })
}

module.exports = {
  getGallery: getGallery
}


