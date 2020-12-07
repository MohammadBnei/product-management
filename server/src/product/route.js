// const { verifyJWT, getTokenPaymentInfo, getMarchandOptions } = require('../token/tokenHandle')
const { getProducts, createProduct, updateProduct, getProductById, deleteProduct, searchProduct } = require('./controller')

module.exports = app => {

    const router = require('express').Router()

    router.get('/', getProducts)
    router.post('/:id', createProduct)
    router.post('/', updateProduct)
    router.get('/', getProductById)
    router.delete('/:id', deleteProduct)

    router.get('/search', searchProduct)

    app.use('/products', router)
}
