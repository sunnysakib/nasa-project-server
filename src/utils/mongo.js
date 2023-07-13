const mongoose = require("mongoose");


const MONGO_URL =
  "mongodb+srv://nasa-api:pwlPtwNujWi4nSEW@cluster0.7b8rkfc.mongodb.net/nasa?retryWrites=true&w=majority";


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