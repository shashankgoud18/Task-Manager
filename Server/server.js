const app = require('./app');
const connectToDb = require('./config/database');
require('dotenv').config({ path: './config/config.env' });
const cloudinary = require('cloudinary');


connectToDb();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const port = process.env.PORT || 5000;

app.listen( process.env.PORT , '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});


module.exports = cloudinary;