const jwt = require('jsonwebtoken');
const userModel = require('../Models/UserModel');
const getListUser = async (req, res) => {
    //1 get token from client
    const bearerHeader = req.headers['authorization'];
    const accessToken = bearerHeader.split(' ')[1];

    try {
        //2. verify access token
        const decodeJwt = jwt.verify(accessToken, process.env.SECRET_JWT);
        if(decodeJwt){
            const users = await userModel.find();
            res.status(200).send(users);
        }
    } catch (error) {
        // send error code to refresh token
        if(error instanceof jwt.TokenExpiredError){
            return res.status(401).send('Token expired');
        }
        //logs error
    }
}

const userDetail = (req, res) => {
    res.send('user detail');
}

module.exports = {
    getListUser: getListUser,
    userDetail: userDetail
}