
const express = require('express');
const app = express();
const cors = require('cors');

const userRoute = require('./Router/UserRoute');
const authRoute = require('./Router/AuthRoute');
const connectDB = require('./Services/ConnectDBService');

const port = 5000;
//middleware apply cors add all requests
app.use(cors());

//middleware get information from client by req.body
app.use(express.json());

//connect database
connectDB();

//middleware router
app.use('/users', userRoute);
//api/auth/register -- post
app.use('/api/auth', authRoute);


app.listen(port, function(){
    console.log('server listen on port 5000');
});