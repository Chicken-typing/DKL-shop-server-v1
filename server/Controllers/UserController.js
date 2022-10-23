const getListUser = (req, res) => {
    res.send('list users');
}

const userDetail = (req, res) => {
    res.send('list information');
}

module.exports = {
    getListUser: getListUser,
    userDetail: userDetail
}