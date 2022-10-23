
const express = require('express');
const app = express();
const userRoute = require('./Router/UserRoute');

const connectDB = require('./Services/ConnectDBService');

const port = 5000;

//connect database
connectDB();

//middleware router
app.use('/users', userRoute);



app.listen(port, function(){
    console.log('server listen on port 5000');
});