const jwt = require('jsonwebtoken');
const getListUser = (req, res) => {
    //1 get token from client
    const bearerHeader = req.headers['authorization'];
    const accessToken = bearerHeader.split(' ')[1];

    //2. verify access token
    const decodeJwt = jwt.verify(accessToken, process.env.SECRET_JWT);
    console.log(decodeJwt);
}

const userDetail = (req, res) => {
    res.send('user detail');
}

module.exports = {
    getListUser: getListUser,
    userDetail: userDetail
}