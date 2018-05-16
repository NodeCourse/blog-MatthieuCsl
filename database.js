const Sequelize = require('sequelize');
const db = new Sequelize('nodejs_blog', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',

});

const Article = db.define('article', {
  title: { type: Sequelize.STRING },
  description: { type: Sequelize.STRING },
  content: { type: Sequelize.STRING },
  photo: { type: Sequelize.STRING }
});

module.exports.db = db;
module.exports.Article = Article;
