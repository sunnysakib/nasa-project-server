const http = require("http");
const app = require("./app");
const { loadLaunchData } = require("./models/launches.model");
const { loadPlanetsData } = require("./models/planets.model");
const { mongoConnect } = require("./utils/mongo");


const PORT = 8000;

const server = http.createServer(app);

async function startServer() {
  await mongoConnect();

  await loadPlanetsData();
  await loadLaunchData();

  server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  });
}

startServer();
