// const mongoose = require("mongoose");
// const initData = require("./data.js");
// const Listing = require("../models/listing.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// main()
//   .then(() => {
//     console.log("Connection to DataBase Successfull");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// async function main() {
//   await mongoose.connect(MONGO_URL);
// }

// const initDB = async () => {
//   await Listing.deleteMany({});
//   initData.data = initData.data.map((obj) => ({
//     ...obj,
//     owner: "68700e7063b67a1dc824083e",
//   }));
//   for (let data of initData.data) {
//     const listing = await new Listing({
//       title: data.title,
//       description: data.description,
//       image: data.image.url,
//       price: data.price,
//       location: data.location,
//       country: data.country,
//       owner: data.owner,
//     }).save();
//     console.log("Data Initalised");
//   }
// };

// initDB();

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const dotenv = require("dotenv");
dotenv.config();

main()
  .then((res) => {
    // Connection successful
  })
  .catch((err) => {
    console.error(err);
  });

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

const initDb = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "688ecbd751381f9487947a92",
  }));
  await Listing.insertMany(initData.data);
  // Database initialized
};

initDb();
