const express = require('express')
const app = express()
const port = 3000

// middleware example, static assets are just that, they will always be the same between requests,
// looks in the public folder for a file that matches the name of the request path (i.e. help.html). 
// If it finds it, then it serves that, if not then it sends the request to the route handlers.
app.use(express.static(__dirname + '/public'));

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