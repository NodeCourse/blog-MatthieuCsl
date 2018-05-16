const express = require('express');
const app = express();
const db = require('./database');


// Use Pug to render views
app.set('view engine', 'pug');
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
        articles: articles
      });
    });
});

app.listen(3000);
