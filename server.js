const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');

const cors = require('cors');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const sharedsession = require("express-socket.io-session");

const passport = require('passport');
const localStrategy = require('./middleware/passportStrategy');
const authRoutes = require('./routes/authRoutes');
const User = require('./models/userModel');

const { MONGO, SESSION_SECRET } = require('./keys');
const PORT = process.env.PORT || 2000;

mongoose.connect(`mongodb://${MONGO.username}:${MONGO.password}@ds135776.mlab.com:35776/authenticate`, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
const server = http.Server(app);
const io = socketIO(server);
const session = expressSession({ secret: SESSION_SECRET, saveUninitialized: false, resave: false });

app.use(cors({ origin: "*"}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session);
io.use(sharedsession(session));

app.use(passport.initialize());
app.use(passport.session());
passport.use(localStrategy);

app.use('/auth', authRoutes);

io.on('connection', socket => {
	socket.emit('connect', { message: "Welcome" });
	
	socket.on('update', data => {
		console.log(data);
	});
	socket.on('disconnect', () => {
		console.log("User disconnected.");
	});
});

server.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));
