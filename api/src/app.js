const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth" , userRoutes);

module.exports = app;