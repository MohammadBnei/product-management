const { signUp, jwtSignIn, signIn } = require('../controller/auth')
const { verifyJWT } = require('../jwt')
const { verifyUser } = require('../validator/user')

module.exports = app => {

    const router = require('express').Router()

    router.post('/signup', verifyUser, signUp)

    router.get('/signin', verifyJWT, jwtSignIn)

    router.post('/signin', verifyUser, signIn)

    app.use('/', router)
}
