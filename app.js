const express = require("express");
const app = express();
const rutas = require("./routes");
const cors = require("cors");

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/api", rutas);

module.exports = app;
