const http = require("http");
const app = require("./app");
const mongoose = require("mongoose");

const { loadPlanetsData } = require("./models/planets.model");

const PORT = process.env.PORT || 8000;

const MONGO_URL =
  "mongodb+srv://haitn:f2HheilOMF3q51hI@nasacluster.umcna.mongodb.net/?retryWrites=true&w=majority";

const server = http.createServer(app);

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!!!");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

// to load some data or perform some actions before our server actually starts responding to the user
async function startServer() {
  await mongoose.connect(MONGO_URL);
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}

startServer();
