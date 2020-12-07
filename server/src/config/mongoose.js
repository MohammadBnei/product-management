const mongoose = require('mongoose')

const uri = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => console.log('Connected to the database !'))

module.exports = { mongoose }