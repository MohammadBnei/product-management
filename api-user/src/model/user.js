const bcrypt = require('bcrypt')

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        // attributes
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            },
            set(val) {
                const hash = bcrypt.hashSync(val, 2)
                this.setDataValue('password', hash)
            }
        }
    })

    User.prototype.verifyPassword = function (enteredPassword) {
        return bcrypt.compare(enteredPassword, this.password)
    }

    User.prototype.toJSON = function () {
        const user = {...this.get()}


        delete user.password
        return user
    }

    return User
}
