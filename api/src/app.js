const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes.js");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/user" , userRoutes);
app.use("/admin", adminRoutes);

module.exports = app;