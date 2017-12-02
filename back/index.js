//external modules and dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
const session = require('express-session');
require('dotenv').config();

const passport = require('passport');


const authController = require('./controllers/authController.js');

const app = module.exports = express();

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());
// app.use(express.static('../front/build'));

massive(process.env.CONNECTION_STRING).then(dbInstance => app.set('db', dbInstance));

const strategy = require('./strategy.js')

passport.use(strategy)

app.use( bodyParser.json() );
app.use( cors( {origin: true, credentials: true}) );


const mainController = require('./controllers/mainController.js')


passport.serializeUser((user, done) => {
  const {familyName, givenName} = user.name;
  var random = Math.floor(Math.random() * 10);
  done(null, {
    authId: user.identities[0].user_id,
    firstName: givenName ? givenName : '',
    lastName: familyName ? familyName: '',
    email: user.emails[0].value,
    picture: `https://robohash.org/${random}`
  });
})

passport.deserializeUser((profile, done) => {
  var random = Math.floor(Math.random() * 10);
  const db = app.get('db');
  db.findUser(profile)
  .then(user => {
    if (user[0]) {
      return done(null, user[0]);
    }
    else {
      db.createUser(profile)
      .then(user => done(null, user[0]))
    }
  })
  done(null, profile);
})

//endPoints
app.get('/api/auth/login', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
  successRedirect: 'http://localhost:3000/dropdown',
  failureRedirect: 'http://localhost:4000/api/auth/login'
}))

app.get('/api/auth/setUser', authController.setUser);
app.get('/api/auth/authenticated', authController.authenticated);
//logut should be a post
app.get('/api/auth/logout', authController.logout);


//This is the bit that protects all of the routes
app.get('/dropdown', (req, res, next) => {
  if (!req.user) {

    return res.status(401).send('Log in required');
  } else {
    return res.status(200).send(req.user);
  }
})


app.post('/api/snapshots', mainController.createSnapshot);
app.post('/api/events', mainController.createEvent);
app.get('/api/statuses', mainController.searchStatuses);
app.get('/api/usertimes', mainController.trackUserTimes);
app.get('/api/eventuseraggtimes', mainController.eventUserAggTimes);
app.get('/api/statusesAvailableForChoosing', mainController.statusesAvailableForChoosing);



const port = process.env.PORT || 4000;
app.listen(port, () => {console.log(`Server is g2g on port ${port}.`)})
