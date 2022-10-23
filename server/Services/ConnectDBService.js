const mongoose = require('mongoose');
//connect database
async function connectDatabase() {
    try {
        await mongoose.connect('mongodb://localhost:27017/sneaker-store');
        console.log('connect database success');
    } catch (error) {
        console.log('connect database fail', error);
    }
}

module.exports = connectDatabase