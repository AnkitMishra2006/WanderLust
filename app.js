const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const port = 8080;

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

main()
  .then(() => {
    console.log("Connection to DB Successful ");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
