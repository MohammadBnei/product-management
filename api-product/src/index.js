
// This is a helper module to load all the routes
module.exports = app => {
    require('./product')(app),
    require('./dispatcher').clientRouter(app)
}
