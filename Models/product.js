const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
        trim: true
    },
    description: {
        required: true,
        type: String,
        trim: true
    },
    images: [{
        required: true,
        type: String
    }],
    quantity: {
        required: true,
        type: Number
    },
    price: {
        required: true,
        type: Number
    },
    category: {
        type: String,
        required: true
    }
})

const Product = mongoose.model('Product', productSchema);
module.exports = { Product, productSchema };