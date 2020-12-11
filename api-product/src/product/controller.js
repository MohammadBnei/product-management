const { Product } = require('../models')
const { eventEmitter, UPDATE, REMOVED } = require('../dispatcher')

module.exports = {
    searchProduct: async (req, res) => {
        try {
            const avalaibleSearch = ['name', 'id', 'type', 'price', 'rating', 'warrantyYears', 'avalaible']

            for (const param of avalaibleSearch) {
                const searchParam = req.query[param]
                if (!searchParam)
                    break

                // TODO : Search mongo
            }
            res.send([])
        } catch (error) {
            console.log(error)
            res.status(400).send({
                message: error.message || 'Something went wrong with the search'
            })
        }
    },

    getProducts: async (req, res) => {
        try {
            const products = await Product.find({})
            res.json(products)
        } catch (error) {
            console.log(error)
            res.status(400).send({
                success: false,
                message: error.message || 'Something went wrong with transaction details. Please try again later',
            })
        }
    },

    createProduct: async (req, res) => {
        try {
            let product = new Product(req.body)
            product = await product.save()

            eventEmitter.emit(UPDATE, product)

            res.json(product)
        } catch (error) {
            console.log(error)
            res.status(400).send({
                success: false,
                message: error.message || 'Something went wrong with transaction details. Please try again later',
            })
        }
    },

    updateProduct: async (req, res) => {
        try {
            const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
                new: true
            })

            eventEmitter.emit(UPDATE, product)

            res.send(product)
        } catch (error) {
            console.log(error)
            res.status(400).send({
                success: false,
                message: error.message || 'Something went wrong with transaction details. Please try again later',
            })
        }
    },

    deleteProduct: async (req, res) => {
        try {
            const productId = req.params.id

            const deletedProduct = await Product.findByIdAndDelete(productId)

            eventEmitter.emit(REMOVED, { _id: productId })

            res.send(deletedProduct)
        } catch (error) {
            console.log(error)
            res.status(400).send({
                success: false,
                message: error.message || 'Something went wrong with transaction details. Please try again later',
            })
        }
    },


    getProductById: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id)
            res.json(product)
        } catch (error) {
            console.log(error)
            res.status(400).send({
                message: error.message || 'Something went wrong with the search'
            })
        }
    },
}
