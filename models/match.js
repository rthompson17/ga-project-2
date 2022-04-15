const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// review embedded in the match
const reviewSchema = new Schema(
  {
    reviewText: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

// match's data
const matchSchema = Schema(
  {
    matchName: {
      type: String,
      required: true,
    },
    matchDate: {
      type: Date,
      default: function () {
        return new Date().setFullYear(new Date().getFullYear());
      },
    },
    overallRating: String,
    currentlyMatched: { type: Boolean, default: false },
    reviews: [reviewSchema],
    reviewerMessage: [{ type: Schema.Types.ObjectId, ref: "Message" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Match", matchSchema);
