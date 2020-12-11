const { mongoose } = require('../config/mongoose')
const Double = require('@mongoosejs/double');


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    type: {
        type: String,
        required: true,
    },
    price: Double,
    warranty: Number,
    avalaible: Boolean,
}, {
    timestamps: true
})

const Product = mongoose.model('Product', productSchema)


module.exports = { Product }