const Product = require("../models/ProductModel")
const express = require("express");
const { where } = require("../models/ProductModel");
const {Router} =express
const route = Router()

route.get("/allproducts", (req, res, next) =>{
    Product.find().exec().then(listProducst => {
        res.json({ list: listProducst })
      }).catch((err) => {
        console.error(err)
      })
})
route.post("/filter", (req, res, next) =>{
  let start = req.body.filteredPrice[0];
  let end = req.body.filteredPrice[1];
  let filter = {};
  for (x in req.body) {
    switch (x) {
      case "filteredColor":
        if(req.body[x]) {
          filter = {color: req.body.filteredColor}
        }        
        break;
      case "filteredPrice":
        if(req.body[x]) {
          filter = {price: { $gte: start, $lte: end }}
        }
        break;
      case "filteredSize":
        if(req.body[x]) {
          filter = {size: req.body.filteredSize}
        }
        break;
      case "filteredType":
        if(req.body[x]) {
          filter = {productType: req.body.filteredType}
        }
        break;
    }
  }
  console.log(filter);
  Product.find(filter)
  .exec().then(product => {
    // console.log(product)
  })
})

route.get("/allproducts/:id", (req, res, next) =>{
  Product.findById(req.params.id).exec().then(product => {
      res.json({ product })
    }).catch((err) => {
      console.error(err)
    })
})

module.exports = route