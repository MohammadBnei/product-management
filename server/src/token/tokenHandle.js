const jwt = require('jsonwebtoken')
const fetch = require('node-fetch')

module.exports = {
    /**
     * Middleware
     * Verifies the token passed as a header or as a parameter (for payment routes)
     * Extract the userId from the token
     * Adds it to the req object
     */
    verifyJWT: async (req, res, next) => {
        try {
            let token = req.headers['authorization'] || req.params.token

            if (!token) throw new Error('No token provided')

            token = token.replace('Bearer ', '')

            const { userId } = jwt.verify(token, process.env.JWT_SECRET)

            if (!userId) throw new Error('There was an error with the user account')

            req.userId = userId

            next()
        } catch (error) {
            console.log(error)
            return res.status(401).json({
                success: false,
                message: error.message || 'Something went wrong with your token',
            })
        }
    },

}

