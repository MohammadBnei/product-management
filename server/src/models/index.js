const { mongoose } = require('../config/mongoose')
require('mongoose-double')(mongoose)

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: mongoose.Schema.Types.Double,
        required: true,
    },
    price: { type: Number, get: getPrice, set: setPrice },
    warantyYears: Number,
    avalaible: Boolean,
}, {
    timestamps: true
})

function getPrice(num) {
    return (num / 100).toFixed(2);
}

function setPrice(num) {
    return num * 100;
}

productSchema.plugin(require('mongoose-lifecycle'))

const Product = mongoose.model('Product', productSchema)

Product.on('afterSave ', function (pr) {
    console.log('A new product "%s" was saved', pr.name);
})

Product.on('afterRemove ', function (pr) {
    console.log('A new product "%s" was removed', pr.name);
})


module.exports = { Product }