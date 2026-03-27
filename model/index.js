module.exports.Token = require("./token.model");
module.exports.Blog = require("./blog.model");
module.exports.User = require("./user.model");
// const { Sequelize } = require('sequelize');
// const config = require('../config/config.js');

// const sequelize = new Sequelize(config.db_name, config.db_user, config.db_password, {
//     host: config.db_host,
//     dialect: 'postgres',
//     port: config.db_port,
// });

// const db = {};
// db.sequelize = sequelize; //connection instance to the database
// db.Sequelize = Sequelize; //library itself , needed for db.sync etc

// //let models in too
// db.Blog = require('./blog.model.js')(sequelize, Sequelize);

// module.exports = db;
