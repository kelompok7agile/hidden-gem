const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes.js");
const adminRoutes = require("./routes/adminRoutes");
const tempatRoutes = require("./routes/tempatRoutes.js");
const resetRoutes = require("./routes/resetRoutes.js");
const reviewRoutes = require("./routes/reviewRoutes.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/dokumen", express.static(path.join(__dirname, "../uploads/dokumen")));

app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/tempat", tempatRoutes);
app.use("/reset", resetRoutes);
app.use("/review", reviewRoutes);

app.get("/api/image/tempat/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "../uploads", "dokumen", filename);
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("Error sending file:", err);
      res.status(404).send("File not found");
    } else {
      console.log("File sent:", filename);
    }
  });
});

app.get("/api/image/user/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "../uploads", "dokumen", filename);
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("Error sending file:", err);
      res.status(404).send("File not found");
    } else {
      console.log("File sent:", filename);
    }
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;
