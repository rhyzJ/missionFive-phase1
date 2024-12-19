import mongoose from "mongoose"; // Import mongoose

// connect to the database
const dbURI = "mongodb://localhost:27017/trademecli";

//connect to mongo db
const connectDB = async () => {
  try {
    console.log("Attempting to connect to MongoDB...");
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // 5 seconds timeout
    });
    console.info("Connected to the database");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

export default connectDB;
