const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
// Logger
const morgan = require('morgan')
// Header 
const helmet = require('helmet')
// https module
const spdy = require('spdy')
const { PORT, ssl } = require('./src/config')

const app = express()

app.use(helmet())

app.use(cors())

// parse requests of content-type - application/json
app.use(bodyParser.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

app.use(morgan('dev'))

// Loading all the routes
require('./src')(app)

// Creating the https server
const server = spdy.createServer(ssl, app)

server.listen(PORT, (error) => {
    if (error) {
        console.error(error)
    } else {
        console.log(`Listening on port: ${PORT}`)
    }
})

module.exports = server
