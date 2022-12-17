import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRoute from './Router/seedRoute.js';
import productRoute from './Router/productRoute.js';
import userRoute from './Router/userRoute.js';
import orderRoute from './Router/orderRoute.js';
import uploadRoute from './Router/uploadRoute.js';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('connected to MongoDB');
}).catch(error => {
  console.log(error.message);
});

const app = express();

app.use(cors());

//middleware get information from client by req.body
app.use(express.json({ limit: "50mb" }));

app.use(express.urlencoded({ extended: true }));

app.use('/api/seed', seedRoute);
app.use('/api/products', productRoute);
app.use('/api/users', userRoute);
app.use('/api/orders', orderRoute);
app.use('/api/upload', uploadRoute);

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

// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   }
// });

// io.on("connection", (socket) => {
//   console.log(`User Connected: ${socket.id}`);

//   socket.on("join_room", (data) => {
//     socket.join(data);
//     console.log(`User with ID: ${socket.id} joined room: ${data}`);
//   });

//   socket.on("send_message", (data) => {
//     socket.to(data.room).emit("receive_message", data);
//   });

//   socket.on("disconnect", () => {
//     console.log("User Disconnected", socket.id);
//   });
// });

// server.listen(3001, () => {
//   console.log("SERVER RUNNING");
// });