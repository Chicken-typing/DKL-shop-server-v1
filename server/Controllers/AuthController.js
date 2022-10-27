const userModel = require('../Models/UserModel');

const register = async (req, res) => {
    try {
        //get information from client
        const { username, email, password } = req.body;
        console.log(req.body);

        //create data to database
        await userModel.create({
            username: username,
            email: email,
            password: password,
            role: 'customer',
        });
        return res.status(200).send('register user');
    } catch (error) {
        console.log('error', error);
    }

};

module.exports = {
    register: register
};