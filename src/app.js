const express = require("express");
const cors = require("cors");
const planetsRouter = require("./routes/planets/planets.router");

const app = express();

var whitelist = ["http://localhost:3000"];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(planetsRouter);

module.exports = app;
