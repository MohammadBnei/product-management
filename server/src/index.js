
// This is a helper module to load all the routes
module.exports = app => {
    require('./token').route(app)
    require('./swapi')(app)
}
