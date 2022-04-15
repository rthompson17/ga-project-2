const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// user's data
const userSchema = new mongoose.Schema(
  {
    name: String,
    googleId: {
      type: String,
      required: true,
    },
    email: String,
    avatar: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
