const app = require('./app');
const connectToDb = require('./config/database');
require('dotenv').config({ path: './config/config.env' });


connectToDb();

const port = process.env.PORT || 5000;

app.listen( process.env.PORT , () => {
  console.log(`Server is running on port ${port}`);
});

