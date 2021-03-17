import express from 'express';
import { config } from 'dotenv';
import mongoose from 'mongoose';
mongoose.connect(
  'mongodb+srv://hoang:142536@shop-mnml.et8ke.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const app = express();
config();
app.use('/', (req, res) => {
  res.send('<h1>hello world</h1>').end();
});

app.listen(4000, () => {
  console.log('listen on port 4000');
});
