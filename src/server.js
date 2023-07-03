const http = require("http");
const app = require("./app");
const { loadPlanetsData } = require("./models/planets.model");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 8000;

const MONGO_URL =
  "mongodb+srv://nasa-api:pwlPtwNujWi4nSEW@cluster0.7b8rkfc.mongodb.net/nasa?retryWrites=true&w=majority";

const server = http.createServer(app);

async function startServer() {
  await mongoose.connect(MONGO_URL).then(
    () => {
      console.log("MongoDB connection established");
    },
    (err) => {
      console.error(err);
    }
  );

  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  });
}

startServer();
