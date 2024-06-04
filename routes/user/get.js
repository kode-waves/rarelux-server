module.exports = (req, res, next) => {
    console.log("--------------")
    res.send({ message: 'This is a GET API response' } );
};
