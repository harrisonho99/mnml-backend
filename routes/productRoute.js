const express = require('express');
const { Router } = express;
const route = Router();
const productController = require('../controllers/product');

//  api/allproducts
route.get('/allproducts', productController.getAllProduct);
//  api/filter
route.post('/filter', productController.postFilterProduct);
// api/product/:id
route.get('/product/:id', productController.getProduct);

module.exports = route;
