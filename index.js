const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./database');



// Use Pug to render views
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));
// Serve assets from the public folder
app.use(express.static('public'));

app.get('/', (req,res) => {
  db.Article
    .sync()
    .then(() => {
      return db.Article.findAll();
    })
    .then((articles) => {
      res.render('homepage', {
        articles
      });
    });
});

app.get('/createArticle', (req, res) => {
  res.render('/createArticle');
});

app.get('/freshArticle', (req, res) =>{
  res.render('/freshArticle');
});

//creation de la route post pour un article
app.post('/api/article', (req, res) => {
  const title = req.body.title;
  db.Article
    .create({ title: title })
    .then(() => {
      res.redirect('/');
    });
});

app.post('/api/article/:articleId/upvote', (req, res) => {
  db.Vote.sync()
    .then(() => {
      db.Vote.create({
      type: 'up',
      articleId: req.params.articleId
    });
  res.redirect('/');
  });
});

app.listen(3000);
