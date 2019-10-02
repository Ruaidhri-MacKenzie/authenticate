const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { MONGO_KEY } = require('./keys');

const corsHeaders = require('./middleware/corsHeaders');
const userRoutes = require('./routes/userRoutes');
const port = process.env.PORT || 2000;

mongoose.connect(`mongodb://${MONGO_KEY.username}:${MONGO_KEY.password}@ds135776.mlab.com:35776/authenticate`, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(corsHeaders);

app.use('/user', userRoutes);

app.listen(port, () => console.log(`Server listening on port ${port}...`));
