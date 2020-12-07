const { generateToken } = require('../jwt')
const { User } = require('../model')


module.exports = {
    signUp: async (req, res) => {
        try {
            const user = req.body

            const newUser = await User.create(user)
            
            res.send({ success: true })

        } catch (error) {
            console.error(error)
            res.status(500).send({
                message: error.message || 'Some error occurred'
            })
        }
    },

    signIn: async (req, res) => {
        try {
            const { username, password } = req.body

            let user = await User.findOne({ where: { username } })

            if (!user) return res.status(404).send({
                message: `User ${username} not found`
            })

            const passwordCheck = await user.verifyPassword(password)

            if (!passwordCheck) return res.status(404).send({
                message: 'Wrong password'
            })

            const token = generateToken(user.username)

            res.send({ token, user })

        } catch (error) {
            res.status(500).send({
                message: error.message || 'Some error occurred'
            })
        }
    },

    jwtSignIn: async (req, res) => {
        try {
            const { user } = req

            res.send({
                user: {
                    ...user.get({
                        plain: true
                    }),
                }
            })

        } catch (error) {
            res.status(500).send({
                message: error.message || 'Some error occurred'
            })
        }
    },

    delete: async (req, res) => {
        const id = req.params.id

        try {
            const num = await User.destroy({
                where: { id: id }
            })
            if (num == 1) {
                res.send({
                    message: 'user was deleted successfully!'
                })
            } else {
                res.send({
                    message: `Cannot delete user with id = ${id}.Maybe user was not found!`
                })
            }
        } catch (error) {
            res.status(500).send({
                message: `Could not delete user with id = ${id} `
            })
        }
    }
}
