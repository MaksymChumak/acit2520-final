const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const darksky = require("./darksky");
const pixabay = require("./pixabay");
require('dotenv').config();

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

app.get('/gallery', (request, response) => {
  response.render('gallery.hbs', {
    title: 'Gallery',
  });
});


app.get('/error', (request, response) => {
  response.render('error.hbs', {
  });
});

app.post('/', (request, response) => {

  if (request.body.location == '') {
    response.render('index.hbs', {
      location: `No location entered`
    });
  } else {
    darksky.getLocation(request.body.location).then((coordinates) => {
      return darksky.getWeather(coordinates);
    }).then((result) => {
      response.render('results.hbs', {
        location: `Location: ${request.body.location}`,
        icon: `<img src=/icons/${result['icon']}.png>`,
        summary: `Summary: ${result['summary']}`,
        temp: `Temp: ${result['temp']}°F`,
        title: 'Results',
        name: 'Maksym Chumak',
        studentNumber: 'A00931833'
      });
    }).catch((error) => {
      response.status(400);
      response.render('error.hbs');
    });
  }
});

app.post('/gallery', (request, response) => {
  if (request.body.picsentry == '') {
    response.render('pics.hbs', {
    });
  } else {
    pixabay.getGallery(request.body.image).then((results) => {
      response.render('gallery_results.hbs', {
        title: 'Results',
        name: 'Maksym Chumak',
        studentNumber: 'A00931833',
        pic1: results['pic1'],
        pic2: results['pic2'],
        pic3: results['pic3'],
        pic4: results['pic4']
      });
    }).catch((error) => {
      response.status(400);
      response.render('error.hbs');
    });
  }
});

app.get('/results', (request, response) => {
  response.render('results.hbs', {
    title: 'Results',
    name: 'Maksym Chumak',
    studentNumber: 'A00931833'
  });
});

app.get('/gallery_results', (request, response) => {
  response.render('gallery_results.hbs', {
    title: 'Gallery Results',
    name: 'Maksym Chumak',
    studentNumber: 'A00931833'
  });
});

app.listen(port, () => {
  console.log(`Server is up on the port ${port}`);
});