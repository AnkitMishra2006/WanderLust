const Listing = require("../models/listing.js");
const { getCoordinates } = require("../utils/geocodeing.js");

module.exports.index = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const skip = (page - 1) * limit;

  // Build search query
  let searchQuery = {};
  if (req.query.search) {
    const searchTerm = req.query.search;
    searchQuery = {
      $or: [
        { title: { $regex: searchTerm, $options: "i" } },
        { location: { $regex: searchTerm, $options: "i" } },
        { country: { $regex: searchTerm, $options: "i" } },
        { description: { $regex: searchTerm, $options: "i" } },
      ],
    };
  }

  // Add price filtering
  if (req.query.minPrice || req.query.maxPrice) {
    searchQuery.price = {};
    if (req.query.minPrice)
      searchQuery.price.$gte = parseInt(req.query.minPrice);
    if (req.query.maxPrice)
      searchQuery.price.$lte = parseInt(req.query.maxPrice);
  }

  const listings = await Listing.find(searchQuery)
    .populate("owner", "username")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean(); // Use lean() for better performance when you don't need mongoose documents

  const total = await Listing.countDocuments(searchQuery);
  const totalPages = Math.ceil(total / limit);

  res.render("listings/index.ejs", {
    listings,
    currentPage: page,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
    searchQuery: req.query,
  });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;

  // Validate ObjectId format
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    req.flash("error", "Invalid listing ID");
    return res.redirect("/listings");
  }

  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
        select: "username", // Only select username for performance
      },
    })
    .populate("owner", "username"); // Only select username for performance

  if (!listing) {
    req.flash("error", "No such Listing Found");
    return res.redirect("/listings");
  }

  const MAPTILER_API_KEY = process.env.MAPTILER_API_KEY;

  // Use coordinates from the listing document
  const coordinates = listing.coordinates || null;

  res.render("listings/show.ejs", { listing, MAPTILER_API_KEY, coordinates });
};

module.exports.createListing = async (req, res, next) => {
  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };

  // Geocode the location and store coordinates
  const MAPTILER_API_KEY = process.env.MAPTILER_API_KEY;
  if (newListing.location) {
    try {
      const coordinates = await getCoordinates(
        newListing.location,
        MAPTILER_API_KEY
      );
      newListing.coordinates = coordinates;
    } catch (err) {
      console.error("Geocoding error (createListing):", err);
    }
  }

  await newListing.save();
  req.flash("success", "New Listing Created");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "No such Listing Found");
    return res.redirect("/listings");
  }
  let originalImageUrl =
    listing.image && listing.image.url ? listing.image.url : null;

  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250 ");
  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;

  let updatedListing = await Listing.findByIdAndUpdate(id, {
    ...req.body.listing,
  });

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    updatedListing.image = { url, filename };
    await updatedListing.save();
  }
  req.flash("success", "Listing Updated");
  res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  const deletedListing = await Listing.findByIdAndDelete(id);
  console.log("Deleted Listing: \n", deletedListing);
  req.flash("success", "Listing Deleted");
  res.redirect("/listings");
};
