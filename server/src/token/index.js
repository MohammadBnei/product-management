const jwt = require('jsonwebtoken')

const getToken = payload => jwt.sign({ ...payload }, process.env.JWT_SECRET)

module.exports = {
    route: app => require('./route')(app),
    getToken
}
