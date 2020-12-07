const { Product } = require('../models')

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
            const products = await Product.find({});
            res.send(products);
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
            const newProduct = new Product(req.body);
            const savedProduct = await newProduct.save();
            res.send(savedProduct);
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
            const product = await Product.findByIdAndUpdate(req.params.id, req.body);
            res.send(product);
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
            const deletedProduct = await Product.findByIdAndDelete(req.params.id);
            res.send(deletedProduct);
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
            const product = await Product.findById(req.params.id);
            res.send(product);
        } catch (error) {
            console.log(error)
            res.status(400).send({
                message: error.message || 'Something went wrong with the search'
            })
        }
    },
}
