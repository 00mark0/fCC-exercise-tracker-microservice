const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/", async (req, res) => {
  const { username } = req.body;
  const newUser = new User({ username });
  try {
    const savedUser = await newUser.save();
    res.json({ username: savedUser.username, _id: savedUser._id });
  } catch (err) {
    res.status(500).json({ error: "Failed to create user" });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, "username _id");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

module.exports = router;
