const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from .env file

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    // Define a schema and model for User
    const userSchema = new mongoose.Schema({
      username: { type: String, required: true, unique: true },
    });

    const User = mongoose.model("User", userSchema);

    // Remove all users from the database
    return User.deleteMany({});
  })
  .then(() => {
    console.log("All users have been deleted");
    mongoose.connection.close(); // Close the connection
  })
  .catch((error) => {
    console.error("Error:", error);
    mongoose.connection.close(); // Close the connection on error
  });
