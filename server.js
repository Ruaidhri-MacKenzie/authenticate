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

const { MONGO, SESSION_SECRET } = require('./keys');
const PORT = process.env.PORT || 2000;
const MONGO_URI = process.env.MONGO_URI || `mongodb://${MONGO.username}:${MONGO.password}@ds135776.mlab.com:35776/authenticate`;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
const server = http.Server(app);
const io = socketIO(server);

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
	resave: true,
	saveUninitialized: true,
	cookie: {maxAge: 1000 * 60 * 60},
});

app.use(cors({ origin: "*"}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session);
io.use(sharedSession(session));

app.use(passport.initialize());
app.use(passport.session());
passport.use(localStrategy);

app.use('/auth', authRouter);
io.on('connection', socket => socketHandler(socket));

server.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));
