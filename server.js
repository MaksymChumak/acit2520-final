const express = require('express'),
hbs = require('hbs'),
bodyParser = require('body-parser')

port = process.env.PORT || 8080;

let app = express();

app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getTime', () => {
    date = new Date();
    return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
});

hbs.registerHelper('upper', (text) => {
    return text.toUpperCase();
})

app.use(express.static(__dirname + '/public'));

app.use((request, response, next) => {
    var time = new Date().toString()
    console.log(time)
    next()
})


app.get('/', (request, response) => {
    response.render('index.hbs', {
        title: 'Index',
        name: 'Maksym Chumak',
        studentNumber: 'A00931833'
    });
});

app.get('/404', (request, response) => {
    response.send('Page not found!')
});

app.listen(port, () => {
    console.log(`Server is up on the port ${port}`);
});