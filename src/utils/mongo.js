const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URL =process.env.MONGO_URL;


async function mongoConnect(){
    mongoose.connect(MONGO_URL).then(
        () => {
          console.log("MongoDB connection established");
        },
        (err) => {
          console.error(err);
        }
      );
}

async function mongoDisconnect(){
    await mongoose.disconnect();
}
module.exports = {
    mongoConnect, 
    mongoDisconnect
};