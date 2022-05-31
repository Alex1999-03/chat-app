const { Sequelize } = require('sequelize');
const { DATABASE_URL } = require('../../config');
const SetupModels = require('./models');

const sequelize = new Sequelize(DATABASE_URL, {
    logging: false
});

SetupModels(sequelize);

sequelize.sync();

module.exports = sequelize;
