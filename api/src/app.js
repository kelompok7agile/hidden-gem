const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes.js");
const adminRoutes = require("./routes/adminRoutes");
const tempatRoutes = require("./routes/tempatRoutes.js");
const resetRoutes = require("./routes/resetRoutes.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/user" , userRoutes);
app.use("/admin", adminRoutes);
app.use("/tempat", tempatRoutes);
app.use("/reset", resetRoutes);

module.exports = app;