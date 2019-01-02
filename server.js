const express = require('express')
const hbs = require('hbs');

const app = express()
const port = 3000

// middleware example with static assets ( no modified res based on req )
app.use(express.static(__dirname + '/staticAssets')); // if route is here, send it as a response

// adding partials support in hbs, injecting hbs templates in hbs
hbs.registerPartials(__dirname + '/views/partials')
// app view engine set up to hbs
app.set('view engine', 'hbs'); 

// rendering of specified template by injecting content in it
// provide handlebars into the template first
app.get('/about', (req, res) => {
    res.render('about.hbs', {
      headerPartialText: 'About Page',
      footerPartialText: new Date().getFullYear()
    });
  });

// rendering of specified template by injecting content in it from partial template
// provide handlebars into the template first
app.get('/home', (req, res) => {
    res.render('home.hbs', {
      getcurrentYear: new Date().getFullYear()
    });
  });

// response sent as html, express takes care of other  response elements
app.get('/', (req, res) => res.send('<h1>Hello Express!</h1>'));

// response sent as json, express takes care of other  response elements
// adding routes 
app.get('/detail', (req, res) => {
    res.send({
        name:"TeamK",
        likes:5,
        location:'BG'
    })
});


// listener set up
app.listen(port, () => {
    // specific tasks by callback, when the server is up and listening
    console.log(`Hello Express app, listening on port ${port}!`)
});