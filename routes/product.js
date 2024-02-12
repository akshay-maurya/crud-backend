const express = require('express');
const productRouter = express.Router();
const auth = require('../Middleware/auth');
const { Product } = require('../Models/product');

// get all products
productRouter.get('/api/products', auth, async (req, res) => {
    try {
        const category = req.query.category;
        if (category) {
            const products = await Product.find({ category });
            res.json(products); 
        } else {
            const allProducts = await Product.find({});
            res.json(allProducts);
        }
       
    } catch (e) {
        res.status(500).json({error: e.message});
    }
});

//get searched products
productRouter.get('/api/products/search/:name', auth, async (req, res) => {
    try {
       const products = await Product.find({ 
        name: {$regex: req.params.name, $options: "i" }
    });
       res.json(products); 
    } catch (e) {
        res.status(500).json({error: e.message});
    }
});

module.exports = productRouter;