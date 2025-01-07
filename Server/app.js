const express = require('express');
const User = require('./routes/User.routes');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1',User);

module.exports = app;