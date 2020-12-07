const { User } = require('../model')
const userValidator = require('../validator/user')

module.exports = {
    findAll: async (req, res) => {
      try {
        const users = await User.findAll()
        res.send(users);

      } catch (error) {
        res.status(500).send({
          message: `Cannot retrieve all users`
        })
      }
    },

    update: async (req, res) => {
        try {

            let {user} = req

            // userValidator.verifyUser(user)

            const {
                societyName,
                kbis,
                validated,
                createdAt
            } = await user.update(req.body)

            res.send({
                societyName,
                kbis,
                validated,
                createdAt
            })
        } catch (error) {
            res.status(500).send({
                message: error.message || `Error updating user with id=${req.user.id}`
            })
        }
    },

    // Delete a Tutorial with the specified id in the request
    delete: async (req, res) => {
        try {
            const num = await User.destroy({
                where: { id: req.user.id }
            })
            if (num == 1) {
                res.send({
                    message: 'user was deleted successfully!'
                })
            } else {
                res.send({
                    message: `Cannot delete user with id=${req.user.id}. Maybe user was not found!`
                })
            }
        } catch (error) {
            res.status(500).send({
                message: `Could not delete user with id=${req.user.id}`
            })
        }
    },

    verifyUser: async (req, res) => {
        if (req.user) { return res.send({ success: true }) }

        return res.send({ success: false })
    }
}
