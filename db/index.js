const Sequelize = require("sequelize");
require("dotenv").config({ silent: true });
const db = {};

db.connection = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: false
    },  
    pool: {
        max: parseInt(process.env.POOL_MAX),
        min:  parseInt(process.env.POOL_MIN),
        acquire:  parseInt(process.env.POOL_ACQUIRE),
        idle:  parseInt(process.env.POOL_IDLE)
    },
});

db.models = require("./models")(db.connection, Sequelize);

db.sequelize = Sequelize;

db.connect = (callback) => {
    db.connection.authenticate()
        .then(() => {
            console.log("database Connected")
            callback()})
        .catch((err) => callback(err));
};

module.exports = db;
