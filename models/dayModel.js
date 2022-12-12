const mongoose = require("mongoose");

const daySchema = new mongoose.Schema({
  date: {
    type: String,
    unique: true,
  },
  sql: {
    type: Boolean,
    default: false,
  },
  javaScript: {
    type: Boolean,
    default: false,
  },
  reactJs: {
    type: Boolean,
    default: false,
  },
  dsa: {
    type: Boolean,
    default: false,
  },
  hackerRank: {
    type: Boolean,
    default: false,
  },
  project: {
    type: Boolean,
    default: false,
  },
});

const Day = mongoose.model("Day", daySchema);

module.exports = Day;
