const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();

// Server static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Main about page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Interests page
app.get("/interests", (req, res) => {
  res.sendFile(path.join(__dirname, "interests.html"));
});

// WillAnhHitTheCorner page
app.get("/willanhhitthecorner", (req, res) => {
  res.sendFile(path.join(__dirname, "willanhhitthecorner.html"));
});

// Steam player info API endpoint
app.get("/steam/playerInfo", async (req, res) => {
  const url = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_API_KEY}&steamids=${process.env.STEAM_USER_ID}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const player = data.response.players[0];
    res.json(player);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/steam/getOwnedGames", async (req, res) => {
  const url = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_API_KEY}&steamid=${process.env.STEAM_USER_ID}&format=json&include_appinfo=true&include_played_free_games=true`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
