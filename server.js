const express = require('express');
const fs = require('fs');
const port = 3000;
const app = express();

const hbs = require('hbs');

// middleware, example of catching all routes 
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');  // no data injection here
//   // no next() here, app blocks here
// });

// middleware example with static routes ( no modified res based on req )
app.use(express.static(__dirname + '/staticAssets')); // if route is here, send it as a response

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// middleware example for site activity logger
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (error)=>{ 
    if (error) {
      console.log('Unable to append the server log!');
    }
  });
  next();
});

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects'
  });
});

// middleware, unknown route sends back json with errorMessage
app.use((req, res, next) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

// response sent as json, express takes care of other  response elements
// specific route and req, specific res 
// app.get('/detail', (req, res) => {
//     res.send({
//         name:"TeamK",
//         likes:5,
//         location:'BG'
//     })
// });


// listener set up
app.listen(port, () => {
    // specific tasks by callback, when the server is up and listening
    console.log(`Hello Express app, listening on port ${port}!`)
});