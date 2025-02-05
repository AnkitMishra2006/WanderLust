const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("Connection to DataBase Successfull");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  for (let data of initData.data) {
    const listing = await new Listing({
      title: data.title,
      description: data.description,
      image: data.image.url,
      price: data.price,
      location: data.location,
      country: data.country,
    }).save();
    console.log("Data Initalised");
  }
};

initDB();
