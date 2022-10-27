const getListUser = (req, res) => {
    res.send('list users');
}

const userDetail = (req, res) => {
    res.send('user detail');
}

module.exports = {
    getListUser: getListUser,
    userDetail: userDetail
}