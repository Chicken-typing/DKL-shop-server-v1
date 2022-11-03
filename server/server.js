
const express = require('express');
const app = express();
const cors = require('cors');

const userRoute = require('./Router/UserRoute');
const authRoute = require('./Router/AuthRoute');
const connectDB = require('./Services/ConnectDBService');

require('dotenv').config()
//middleware apply cors add all requests
app.use(cors());

//middleware get information from client by req.body
app.use(express.json());

//connect database
connectDB();

//middleware router
app.use('/auth/admin', userRoute);
//api/auth/register -- post
app.use('/api/auth', authRoute);


app.listen(process.env.PORT, function(){
    console.log(`server running on port ${process.env.PORT}`);
});