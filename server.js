require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("public"));

const userRoutes = require("./routes/users");
const exerciseRoutes = require("./routes/exercises");

app.use("/api/users", userRoutes);
app.use("/api/users", exerciseRoutes); // Adjusted to match the required route format

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
