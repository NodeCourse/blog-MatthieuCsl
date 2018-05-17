const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./database');
const cookieParser = require('cookie-parser');
const session = require('express-session');

//Strategie d'authentification
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const COOKIE_SECRET = 'cookie secret';

passport.use(new LocalStrategy((email, password, done) => {
  db.User
    .findOne({ where: { email, password } })
    .then(function (user) {
        // User found
        return done(null, user);
    })
    // If an error occured, report it
    .catch(done);
    }));

//identification de l'utilisateur
passport.serializeUser((user, cb) => {
    // Save the user's email in the cookie
    cb(null, user.email);
});
passport.deserializeUser((email, cb) => {
    // Get a user from a cookie's content: his email
    db.User
        .findOne({ where: { email } })
        .then((user) => {
            cb(null, user);
        })
        .catch(cb);
});

// Use Pug to render views
app.set('view engine', 'pug');

app.use(cookieParser(COOKIE_SECRET));

app.use(bodyParser.urlencoded({ extended: true }));
// Serve assets from the public folder
app.use(express.static('public'));

app.use(session({
    secret: COOKIE_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req,res) => {
      res.render('homepage', { user: req.user });
});

app.post('/homepage', passport.authenticate('local', { successRedirect: '/bienvenu',
                                                    failureRedirect: '/' }));

app.get('/bienvenu', (req,res) => {
      res.render('bienvenu', { user: req.user });
});

//creation de la route post pour un user
app.post('/api/user', (req, res) => {
  const fullname = req.body.fullname;
  const email = req.body.email;
  const password = req.body.password;

  db.User
    .create({ fullname, email, password })
    .then(() => {
      res.redirect('/');
    });
});

db.db.sync().then(() => {
  app.listen(3000);
});
