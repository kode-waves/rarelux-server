const db = require('../models');

const dbConnection = async () => {
    
    try {
        await db.sequelize.sync();
    } catch (err) {
        console.log("Something Wrong while connecting to Database : ", err);
    }
};

module.exports =  dbConnection ;
