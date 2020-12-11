const { getProducts, createProduct, updateProduct, getProductById, deleteProduct, searchProduct } = require('./controller')
const { verifyJWT } = require('../token')

module.exports = app => {

    const router = require('express').Router()

    router.get('/', getProducts)
    router.post('/:id', updateProduct)
    router.post('/', createProduct)
    router.get('/:id', getProductById)
    router.delete('/:id', deleteProduct)

    router.get('/search', searchProduct)

    app.use('/products', verifyJWT, router)
}
