const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

// Manual dotenv configuration
const envPath = path.join(__dirname, '.env');
let mongoURI = '';
let port = 5000;

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const lines = envContent.split('\n');
  
  for (const line of lines) {
    if (line.startsWith('MONGODB_URI=')) {
      mongoURI = line.substring('MONGODB_URI='.length);
    } else if (line.startsWith('PORT=')) {
      port = line.substring('PORT='.length);
    }
  }
}

// Use a hardcoded value if the .env doesn't work
if (!mongoURI) {
  mongoURI = "mongodb+srv://web:fishtank2.0@cluster0.8ysfyoi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
}

const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB with URI:', mongoURI);
    const conn = await mongoose.connect(mongoURI);

    console.log(`MongoDB Atlas Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error connecting to MongoDB Atlas: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
