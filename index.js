const express = require('express');
const mongoose = require('mongoose');
const Product = require("./models/ProductModel")
const {Schema} = mongoose;
// config variable environment
require('dotenv').config();

const app = express();
app.get('/products', (req, res, next) => {
// res.send("hello, " + req.params.id)
Product.find().exec().then(listProducst =>{
    res.json({list : listProducst})
}).catch((err )=>{
console.error(err)
})
});


//connect mongodb
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on('error', (err) => {
  console.error(err);
});
db.on('open', () => {
  app.listen(4000, async() => {

      console.log('listen on port 4000');
        // const product1 = new Product ({name :"huy", count : 10, create_by: "hoang", })
        // await product1.save()
    });
    
});