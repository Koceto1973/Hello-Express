const express = require('express')
const port = 3000;
const app = express();

const hbs = require('hbs');

// middleware example with static routes ( no modified res based on req )
app.use(express.static(__dirname + '/staticAssets')); // if route is here, send it as a response

// middleware, example catching all non-static routes 
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');  // no data injection here
// });

hbs.registerPartials(__dirname + '/views/partials')

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

// unknown route sends back json with errorMessage
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