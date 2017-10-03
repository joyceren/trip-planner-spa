const Sequelize = require('sequelize'),
      { STRING, TEXT, ENUM } = Sequelize;

const db = new Sequelize('postgres://localhost/5432/trip-planner');

module.exports = db;