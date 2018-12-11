const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const darksky = require("./darksky");
const second_api = require("./second_api");

port = process.env.PORT || 8080;

let app = express();
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(__dirname + '/public'));

// Helpers
hbs.registerHelper('getTime', () => {
  date = new Date();
  return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
});

hbs.registerHelper('upper', (text) => {
  return text.toUpperCase();
})

// Midleware
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use((request, response, next) => {
  // let time = new Date().toString();
  // console.log(time);
  console.log(request.body)
  next();
})

// Routes
app.get('/', (request, response) => {
  response.render('index.hbs', {
    title: 'Index',
  });
});

app.get('/error', (request, response) => {
  response.render('error.hbs', {
  });
});

app.post('/', (request, response) => {
  let lat = request.body.lat
  let lng = request.body.lng
  darksky.getWeather(lat, lng).then((result) => {
    if (result) {
      response.render('about.hbs', {
        summary: `Summary: ${result['status']}`,
        temp: `Temp: ${result['temp']}°C`
      });
    } else {
      response.status(400);
      response.render('error.hbs');
    }
  })
})

app.get('/about', (request, response) => {
  response.render('about.hbs', {
    title: 'About',
    name: 'Maksym Chumak',
    studentNumber: 'A00931833'
  });
});

app.listen(port, () => {
  console.log(`Server is up on the port ${port}`);
});