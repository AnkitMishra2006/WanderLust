const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
      trim: true,
      maxLength: [500, "Comment cannot be more than 500 characters"],
    },
    rating: {
      type: Number,
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot be more than 5"],
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // Add index for author-based queries
    },
  },
  {
    timestamps: true, // This automatically adds createdAt and updatedAt
  }
);

// Add compound index for efficient queries
reviewSchema.index({ author: 1, createdAt: -1 });

module.exports = mongoose.model("Review", reviewSchema);
