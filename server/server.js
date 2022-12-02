import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRoute from './Router/seedRoute.js';
import productRoute from './Router/productRoute.js';
import userRoute from './Router/userRoute.js';
import orderRoute from './Router/orderRoute.js';

const cors = require('cors');
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});


mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('connected to MongoDB');
}).catch(error => {
  console.log(error.message);
});



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/seed', seedRoute);
app.use('/api/products', productRoute);
app.use('/api/users', userRoute);
app.use('/api/orders', orderRoute);

app.get('/api/keys/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});


app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server listening on port: ${port}`);
})