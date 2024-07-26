const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Exercise = require("../models/Exercise");

router.post("/:_id/exercises", async (req, res) => {
  // Corrected to include `:_id`
  const { _id } = req.params;
  const { description, duration, date } = req.body;

  try {
    const user = await User.findById(_id);
    if (!user) return res.status(404).json({ error: "User not found" });

    const newExercise = new Exercise({
      userId: _id,
      description,
      duration,
      date: date ? new Date(date) : new Date(),
    });

    const savedExercise = await newExercise.save();
    res.json({
      username: user.username,
      description: savedExercise.description,
      duration: savedExercise.duration,
      date: savedExercise.date.toDateString(),
      _id: user._id,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to add exercise" });
  }
});

router.get("/:_id/logs", async (req, res) => {
  const { _id } = req.params;
  const { from, to, limit } = req.query;

  try {
    const user = await User.findById(_id);
    if (!user) return res.status(404).json({ error: "User not found" });

    let filter = { userId: _id };
    if (from || to) filter.date = {};
    if (from) filter.date.$gte = new Date(from);
    if (to) filter.date.$lte = new Date(to);

    let logs = await Exercise.find(filter).limit(parseInt(limit) || 0);
    logs = logs.map((log) => ({
      description: log.description,
      duration: log.duration,
      date: log.date.toDateString(),
    }));

    res.json({
      username: user.username,
      count: logs.length,
      _id: user._id,
      log: logs,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch logs" });
  }
});

module.exports = router;
