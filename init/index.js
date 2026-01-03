const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");

require('dotenv').config();
const mongo_url = process.env.ATLASDB_URL;

main() 
  .then(() => {
    console.log("connected to DB");
  }) .catch((err) => {  
    console.log(err);
  });
async function main() {
    await mongoose.connect(mongo_url);
};


const initDB = async () => {
  await Listing.deleteMany({});
  await User.deleteMany({});
  // Create a new user
  const user = new User({ username: "demoUser", email: "demo@example.com" });
  await User.register(user, "password123");
  // Use the new user's _id for all listings
  const updatedData = initData.data.map((obj) => ({
    ...obj,
    owner: user._id
  }));
  await Listing.insertMany(updatedData);
  console.log("data and user were initialized");
};

initDB();

