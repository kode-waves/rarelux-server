const userRoutes = require('./user');

const routes = (server) => {
    userRoutes(server);
};

module.exports = routes;
