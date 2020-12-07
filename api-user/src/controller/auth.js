const { generateToken } = require('../jwt')

module.exports = {
    signUp: async (req, res) => {
        try {
            const { user, contact } = req.body
            userValidator.verifyUser(user)
            contactValidator.verifyContactOnCreateWithUser(contact)

            const newUser = await User.create(user)
            newUser.getContact()
                .then(c => c.update(contact))

            sendCreationMail(contact)

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

            console.log({ username });

            if (username !== user.username) {
                throw new Error('User not found')
            }
            if (password !== user.password) {
                throw new Error('Wrong password')
            }

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

            const contact = await user.getContact()

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
