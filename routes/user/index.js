const getUser = require('./get');
const create = require('./create');
const generateToken = require('../../middleware/generateToken');

module.exports = (server) => {
    server.get( '/api/user', getUser);
    server.post( '/login', create);
};
