// Bouncing DVD Logo
// Daniel Shiffman
// https://thecodingtrain.com/challenges/131-bouncing-dvd-logo.html
// https://youtu.be/0j86zuqqTlQ
// https://editor.p5js.org/codingtrain/sketches/S-es-dYVn

let x;
let y;

let xspeed;
let yspeed;

let canvasWidth;
let canvasHeight;

let dvd;

let r, g, b;

function preload() {
  dvd = loadImage("/images/oui.png");
}

function setup() {
  canvasWidth = document.getElementById("canvas").offsetWidth;
  canvasHeight = document.getElementById("canvas").offsetHeight;
  let myCanvas = createCanvas(canvasWidth, canvasHeight);
  myCanvas.parent("canvas");
  x = random(width);
  y = random(height);
  xspeed = 2;
  yspeed = 2;
  pickColor();
}

function pickColor() {
  r = random(100, 256);
  g = random(100, 256);
  b = random(100, 256);
}

function draw() {
  background(0);
  // rect(x, y, 80, 60);
  // Draw the DVD logo
  tint(r, g, b);
  image(dvd, x, y, dvd.width, dvd.height);

  x = x + xspeed;
  y = y + yspeed;

  if (x + dvd.width >= width) {
    xspeed = -xspeed;
    x = width - dvd.width;
    pickColor();
  } else if (x <= 0) {
    xspeed = -xspeed;
    x = 0;
    pickColor();
  }

  if (y + dvd.height >= height) {
    yspeed = -yspeed;
    y = height - dvd.height;
    pickColor();
  } else if (y <= 0) {
    yspeed = -yspeed;
    y = 0;
    pickColor();
  }
}

function windowResized() {
  canvasWidth = document.getElementById("canvas").offsetWidth;
  canvasHeight = document.getElementById("canvas").offsetHeight;
  resizeCanvas(canvasWidth, canvasHeight);
}

// for the close button in the top left corner of the window. Not related to the DVD logo animation.
function closeWindow() {
  var x = document.getElementById("navbar");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

// get Steam data once the interests page is loaded
async function getSteamData() {
  try {
    const response1 = await fetch("/steam/getOwnedGames");
    const data1 = await response1.json();
    const response2 = await fetch("/steam/playerInfo");
    const data2 = await response2.json();
    let userData = {
      game_count: data1.response.game_count,
      games: data1.response.games,
      player: data2,
    };
    return userData;
  } catch (error) {
    console.error(error.message);
  }
}

async function runner() {
  try {
    let steamData = await getSteamData();
    setInterval(async () => {
      steamData = await getSteamData();
      // console.log(steamData);
      setCurrentPlayedGame(steamData);
      setMostPlayedGames(steamData);
    }, 5000);
  } catch (error) {
    console.error(error.message);
  }
}

function setCurrentPlayedGame(steamData) {
  document.getElementById("current-game-name").textContent =
    steamData.player.gameextrainfo;
  let currentGame = steamData.games.find((game) => {
    return game.appid === parseInt(steamData.player.gameid);
  });
  if (currentGame) {
    document.getElementById("playing-status").classList.remove("grayed-out");
    document.getElementById("playing-status").classList.add("fade-in");
    document.getElementById("playing-status").textContent = "PLAYING";
    document.getElementById("current-game-logo").src =
      `http://media.steampowered.com/steamcommunity/public/images/apps/${currentGame.appid}/${currentGame.img_icon_url}.jpg`;
  } else {
    document.getElementById("current-game-logo").src = "";
    document.getElementById("playing-status").classList.add("grayed-out");
    document.getElementById("playing-status").classList.remove("fade-in");
    document.getElementById("playing-status").textContent = "OFFLINE";
  }
}

function setMostPlayedGames(steamData) {
  let ownedGames = steamData.games;
  ownedGames.sort((a, b) => a.playtime_forever - b.playtime_forever); //https://www.w3schools.com/js/js_array_sort.asp#:~:text=Try%20it%20Yourself%20%C2%BB-,The%20Compare%20Function,-The%20purpose%20of
  let mostPlayedGames = ownedGames.slice(-3);
  mostPlayedGames.reverse();
  let ranks = ["first-game", "second-game", "third-game"];
  for (let i = 0; i < mostPlayedGames.length; i++) {
    let rankName = ranks[i] + "-name";
    let rankLogo = ranks[i] + "-logo";
    let rankHours = ranks[i] + "-hours";
    document.getElementById(rankName).textContent = mostPlayedGames[i].name;
    document.getElementById(rankLogo).src =
      `http://media.steampowered.com/steamcommunity/public/images/apps/${mostPlayedGames[i].appid}/${mostPlayedGames[i].img_icon_url}.jpg`;
    document.getElementById(rankHours).textContent =
      `${Math.trunc(mostPlayedGames[i].playtime_forever / 60)} hours`;
  }
}
