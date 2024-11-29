const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
    pool: {
        max: 10,        // Maximum number of connections
        min: 0,         // Minimum number of connections
        acquire: 30000, // Maximum time to wait for a connection
        idle: 10000     // Maximum time to wait for inactive connections before they are closed
    }
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to database successfully!');
    } catch (error) {
        console.error('Unable to connect to the database: ', error);
    }
})();

module.exports = sequelize;