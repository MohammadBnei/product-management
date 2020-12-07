require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const spdy = require('spdy')

const app = express()

app.use(helmet())
app.use(cors())
// parse requests of content-type - application/json
app.use(bodyParser.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

require('./src/route')(app)

const server = spdy.createServer(require('./ssl'), app)

const PORT = process.env.PORT || 3000

server.listen(PORT, (error) => {
    if (error) {
        console.error(error)
    } else {
        console.log(`Listening on port: ${PORT}`)
    }
})

module.exports = server
