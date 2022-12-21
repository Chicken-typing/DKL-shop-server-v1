import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRoute from './Router/seedRoute.js';
import productRoute from './Router/productRoute.js';
import userRoute from './Router/userRoute.js';
import orderRoute from './Router/orderRoute.js';
import uploadRoute from './Router/uploadRoute.js';
import chatRoute from './Router/chatRoute.js';
import cors from 'cors';
import { Server } from 'socket.io';
import { addUser, getUser, getUsersInRoom, removeUser } from './user.js'
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
app.use('/room', chatRoute)
app.get('/api/keys/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});


app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
const httpServer=app.listen(port, () => {
  console.log(`server listening on port: ${port}`);
})
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connect", (socket) => {
  socket.on("join", account => {
    const { user } = addUser(socket.id, account);
    socket.join(user.room);
  });

  socket.on("sendMessage", ({message}) => {
    const user = getUser(socket.id);
    const data = { user: user.name, email: user.email, message };
    io.to(user.room).emit("message",[data]);
  });

  socket.on("disconnect", () => {
   console.log("disconnect");
  });
});
