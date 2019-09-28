const express = require('express');
const bodyParser = require('body-parser');
const corsHeaders = require('./middleware/corsHeaders');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT || 2000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(corsHeaders);

app.use('/user', userRoutes);

app.listen(port, () => console.log(`Server listening on port ${port}...`));
