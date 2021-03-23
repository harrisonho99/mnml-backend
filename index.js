const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoute = require('./routes/productRoute');
const bodyParser = require('body-parser');
// config variable environment
require('dotenv').config();

const app = express();
//parse urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse json
app.use(bodyParser.json());
// allow cors
app.use(cors());
//api route
app.use('/api/', productRoute);
// not found route
app.use((_, res) => {
  res.send('Route is not handled yet!');
});

//connect mongodb
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const PORT = process.env.PORT || 4000;
const db = mongoose.connection;
db.on('error', (err) => {
  console.error(err);
});
db.on('open', () => {
  app.listen(PORT, async () => {
    process.stdout.write('listening on port 4000');
  });
});
