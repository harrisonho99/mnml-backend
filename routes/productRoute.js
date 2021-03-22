const Product = require('../models/ProductModel');
const hanldeMultipleFilter = require('../utils/hanldeMultipleFilter');
const express = require('express');
const { Router } = express;
const route = Router();

route.get('/allproducts', (req, res, next) => {
  Product.find()
    .exec()
    .then((listProducst) => {
      res.json({ list: listProducst });
    })
    .catch((err) => {
      console.error(err);
    });
});
route.post('/filter', (req, res) => {
  const option = req.body;
  const query = Product.find();

  hanldeMultipleFilter(option, query, (err, data) => {
    if (err) throw err;
    console.log(data);
    res.send(data);
  });
});

route.get('/allproducts/:id', (req, res, next) => {
  Product.findById(req.params.id)
    .exec()
    .then((product) => {
      res.json({ product });
    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = route;
