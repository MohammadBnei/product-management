const jwt = require('jsonwebtoken')

module.exports = {
    generateToken: function (userId) {
        //1. Dont use password and other sensitive fields
        //2. Use fields that are useful in other parts of the     
        //app/collections/models
        return jwt.sign({ userId }, process.env.JWT_SECRET)
    },

    verifyJWT: async (req, res, next) => {
        try {
            let token = req.headers['authorization']

            if (!token) throw new Error('No token provided')

            token = token.replace('Bearer ', '')

            const { userId } = jwt.verify(token, process.env.JWT_SECRET)

            if (!userId) throw new Error('Not a valid token')

            req.userId = userId

            next()
        } catch (error) {
            return res.status(404).send({
                success: false,
                message: error.message || 'Something went wrong',
            })
        }

    },
}