import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRoute from './Router/seedRoute.js';
import productRoute from './Router/productRoute.js';
import userRoute from './Router/userRoute.js';
import orderRoute from './Router/orderRoute.js';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('connected to MongoDB');
}).catch(error => {
  console.log(error.message);
});

const app = express();

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next()
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