const mongoose = require("mongoose");
const Review = require("./review.js");

const listingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: true, // Add index for search functionality
    },
    description: {
      type: String,
    },
    image: {
      url: String,
      filename: String,
    },
    price: {
      type: Number,
      index: true, // Add index for price-based queries
    },
    location: {
      type: String,
      index: true, // Add index for location-based searches
    },
    country: {
      type: String,
      index: true, // Add index for country-based filtering
    },
    coordinates: {
      type: [Number], // [lng, lat]
      index: "2dsphere", // for geospatial queries if needed
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // Make owner required
      index: true, // Add index for owner-based queries
    },
  },
  {
    timestamps: true, // Add createdAt and updatedAt timestamps
  }
);

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) await Review.deleteMany({ _id: { $in: listing.reviews } });
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
