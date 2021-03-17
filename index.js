import express from 'express';
import { config } from 'dotenv';
import mongoose from 'mongoose';

// config variable environment
config();

const app = express();
app.use('/', (_, res) => {
  res.send('<h1>hello world</h1>').end();
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
  app.listen(4000, () => {});
  console.log('listen on port 4000');
});
