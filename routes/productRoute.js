const express = require('express');
const { Router } = express;
const route = Router();
const productController = require('../controllers/product');

route.get('/allproducts', productController.getAllProduct);
route.post('/filter', productController.postFilterProduct);
route.get('/product/:id', productController.getProduct);

module.exports = route;
