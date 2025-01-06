const express = require('express');
const User = require('./routes/User.routes');

const app = express();
app.use(express.json());

app.use('/api/v1',User);

module.exports = app;