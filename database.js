const Sequelize = require('sequelize');
const db = new Sequelize('nodejs_blog', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',

});

//setup des models
const Article = db.define('article', {
  title: { type: Sequelize.STRING },
  description: { type: Sequelize.STRING },
  content: { type: Sequelize.STRING }
});

const Vote = db.define('vote', {
  type: {
    type: Sequelize.ENUM('up', 'down')
  }
});

//definition des relations
Article.hasMany(Vote);
Vote.belongsTo(Article);

module.exports.db = db;
module.exports.Article = Article;
module.exports.Vote = Vote;
