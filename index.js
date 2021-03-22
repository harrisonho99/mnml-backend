const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/ProductModel');
const parser = require('body-parser');
const cors = require('cors');
const { Schema } = mongoose;
const productRoute = require('./routes/productRoute');
const bodyParser = require('body-parser');
// config variable environment
require('dotenv').config();

const app = express();
//parse urlencoded
app.use(bodyParser.urlencoded());
// parse json req
app.use(bodyParser.json());
app.use(cors());
app.use('/api/', productRoute);
app.use((_, res) => {
  res.send('hello there');
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
  app.listen(4000, async () => {
    console.log('listen on port 4000');
    // const product1 = new Product({
    //   name: "name3",
    //   price: 10,
    //   imageURL: "https://cdn.shopify.com/s/files/1/1300/6871/products/tech-cargo-pants-khaki-2_650x975.jpg?v=1547929626",
    //   color: ["red", "green","blue"],
    //   mainColor: "#2EFEF7",
    //   size: "L",
    //   productType: "sale"
    // })
    // await product1.save()
  });
});
