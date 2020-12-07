const Sequelize = require('sequelize')
const confDb = require('./configDb')

const conf = confDb.development

const sequelize = new Sequelize(conf.DB, conf.USER, conf.PASSWORD, {
    host: conf.HOST,
    dialect: conf.dialect,
    pool: {
        max: conf.pool.max,
        min: conf.pool.min,
        acquire: conf.pool.acquire,
        idle: conf.pool.idle
    }
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

const User = require('./user')(sequelize, Sequelize)

db.User = User
  
module.exports = db
