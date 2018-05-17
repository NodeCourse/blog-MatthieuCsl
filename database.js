const Sequelize = require('sequelize');
const db = new Sequelize('blogv2', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

//setup des models
const User = db.define('user', {
  fullname: { type: Sequelize.STRING },
  email: { type: Sequelize.STRING },
  password: { type: Sequelize.STRING }

});

//definition des relations

module.exports.db = db;
module.exports.User = User;
