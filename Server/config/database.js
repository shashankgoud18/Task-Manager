const mongoose = require('mongoose');

// Function to connect to MongoDB
const connectToDb = async () => {
    try {
        // Connect to MongoDB using the connection string from environment variables
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Log successful connection
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        // Log the error and exit the process with failure
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

// Export the function
module.exports = connectToDb;
