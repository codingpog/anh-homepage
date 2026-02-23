const express = require("express");
const path = require("path");

const app = express();

// Server static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Main about page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Interests page
app.get("/interests", (req, res) => {
  res.sendFile(path.join(__dirname, "underconstruction.html"));
});

// WillAnhHitTheCorner page
app.get("/willanhhitthecorner", (req, res) => {
  res.sendFile(path.join(__dirname, "willanhhitthecorner.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
