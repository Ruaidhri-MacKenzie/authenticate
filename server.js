const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');

const localStrategy = require('./middleware/passportStrategy');
const authRoutes = require('./routes/authRoutes');
const User = require('./models/userModel');

const { MONGO, SESSION_SECRET } = require('./keys');
const PORT = process.env.PORT || 2000;

mongoose.connect(`mongodb://${MONGO.username}:${MONGO.password}@ds135776.mlab.com:35776/authenticate`, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({ origin: "*"}));

app.use(session({ secret: SESSION_SECRET, saveUninitialized: false, resave: false }));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, cb) => cb(null, user.id));
passport.deserializeUser((id, cb) => User.findById(id, (err, user) => cb(err, user)));
passport.use(localStrategy);

app.use(express.static(__dirname + '/client/build'));
app.get('*', (req, res) => res.sendFile(__dirname + '/client/build/index.html'));

app.use('/auth', authRoutes);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));
