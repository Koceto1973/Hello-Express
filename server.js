const express = require('express')
const app = express()
const port = 3000

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
app.listen(port, () => console.log(`Hello Express app, listening on port ${port}!`));