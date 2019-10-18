const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');

const cors = require('cors');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const sharedSession = require('express-socket.io-session');
const connectSession = require('connect-mongodb-session');
const passport = require('passport');
const localStrategy = require('./middleware/passportStrategy');

const authRouter = require('./routes/authRouter');
const socketHandler = require('./handlers/socketHandler');
const User = require('./models/userModel');
const { MONGO, SESSION_SECRET } = require('./keys');
const PORT = process.env.PORT || 2000;
const MONGO_URI = process.env.MONGO_URI || `mongodb://${MONGO.username}:${MONGO.password}@ds135776.mlab.com:35776/authenticate`;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, () => console.log("Database connected..."));

const app = express();
const server = http.Server(app);

const MongoDBStore = connectSession(expressSession);
const store = new MongoDBStore({
  uri: MONGO_URI,
	databaseName: 'authenticate',
	collection: 'sessions',
});
store.on('error', error => console.log(error));

const session = expressSession({
	name: 'sessionId',
	secret: SESSION_SECRET,
	store: store,
	resave: false,
	saveUninitialized: false,
	cookie: {maxAge: 1000 * 60 * 60 * 24 * 365}, // 1 year
});

app.use(session);
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

passport.use(localStrategy);
passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser((id, done) => User.findById(id, '_id username email verified createDate lastLoginDate', (err, user) => done(err, user)));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);

const io = socketIO(server, {cookie: false});
io.use((socket, next) => session(socket.request, {}, next));
io.use(sharedSession(session, {autoSave: true}));
io.on('connection', socket => socketHandler(socket));

server.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));
