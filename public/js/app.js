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
