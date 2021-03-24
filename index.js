const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoute = require('./routes/productRoute');
const authRoute = require('./routes/authRoute');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/UserModel');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');

// config variable environment
require('dotenv').config();

const app = express();
//set test engine
app.set('view engine', 'ejs');

// flash
app.use(flash());
//session config
app.use(
  session({
    secret: process.env.SESSION,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 6055500 },
  })
);
// parse cookie
app.use(cookieParser());
//parse urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse json
app.use(bodyParser.json());
// allow cors
app.use(cors());
// init passport
app.use(passport.initialize());
app.use(passport.session());

// credential passport
passport.use(
  new LocalStrategy((userName, password, done) => {
    User.findOne({ userName })
      .exec()
      .then((user) => {
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        } else if (user.password !== password) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      })
      .catch((err) => {
        process.stdout.write(err.toString());
        done(err);
      });
  })
);
//api route
app.get('/', (_, res) => {
  res.render('index');
});
app.use('/api/', productRoute);
app.use('/api/', authRoute);

// not found route
app.use((_, res) => {
  res.send('Route is not handled yet!');
});

//connect mongodb
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const PORT = process.env.PORT || 4000;
const db = mongoose.connection;
db.on('error', (err) => {
  console.error(err);
});
db.on('open', () => {
  // const user = new User({ userName: 'nhathoang', password: '12345' });
  // user.save();
  app.listen(PORT, async () => {
    process.stdout.write('listening on port 4000');
  });
});
