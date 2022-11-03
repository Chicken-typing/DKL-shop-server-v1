const userModel = require('../Models/UserModel');
const bcrypt = require('bcrypt');
const UserModel = require('../Models/UserModel');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        //get information from client
        const { username, email, password } = req.body;
        console.log(req.body);

        //create data to database
        await userModel.create({
            username: username,
            email: email,
            password: bcrypt.hashSync(password,10),
            role: 'customer',
        });
        return res.status(200).send('register user');
    } catch (error) {
        console.log('error', error);
    }

};

const login = async (req, res) => {
    // check email, password
    const user = await userModel.findOne({email: req.body.email});
    if (!user) {
        return res.status(400).send('Invalid email or password');
    }
    // check password
    const isPasswordValid = bcrypt.compareSync(req.body.password,  user.password);
    if(!isPasswordValid) {
        return res.status(400).send('Invalid email or password');
    }
    //jwt
    const jwtToken = jwt.sign({
        _id: user._id,
        username: user.username,
        role: user.role,
    },process.env.SECRET_JWT, {
        expiresIn: 300
    })

    return res.status(200).send({
        accessToken: jwtToken
    });

}

module.exports = {
    register: register,
    login: login
};