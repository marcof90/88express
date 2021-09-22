const express = require('express');
const router = express.Router();

const Product = require('../models/product');

//routes
router.get('/', async (req, res)=>{
    const products = await Product.find();
    res.send(products);
});

router.post('/', async (req, res)=>{
    // res.send(new Product(req.body));
    const product = new Product(req.body);
    await product.save();
    res.send(product);
});

module.exports = router;