const http = require("http");
const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();

const { loadPlanetData } = require("./models/planets.model");

const server = http.createServer(app);

const MONGO_URI = process.env.MONGO_URI;

const PORT = process.env.PORT || 3500;

(async function startServer() {
  await mongoose.connect(MONGO_URI);
  await loadPlanetData();
  server.listen(PORT, () => {
    console.log(`Server is listening to ${PORT}`);
  });
})();

mongoose.connection.once("open", () => {
  console.log("Mongo DB connection ready!");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});
