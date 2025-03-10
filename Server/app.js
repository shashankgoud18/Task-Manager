const express = require('express');
const User = require('./routes/User.routes');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
    limits:{fileSize: 50 * 1024 * 1024},
    useTempFiles:true,
}
));
app.use(cors({
    // origin: "http://192.168.1.100:4000",
    origin:"https://5df7-106-210-99-4.ngrok-free.app",
    credentials: true, // Allow all origins (for development only)
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }));

app.use('/api/v1',User);

app.get('/',(req,res) => {
    res.send('Server is working');
}
);

module.exports = app;