import express from 'express';
import { config } from 'dotenv';
const app = express();
config();
app.use('/', (req, res) => {
  res.send('<h1>hello world</h1>').end();
});

app.listen(4000, () => {
  console.log('listen on port 4000');
});
