const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let gravity = 1;
let friction = 0.85;
let numberOfParticles = 150;
const colorArray = ["#", "#", "#", "#", "#", "#"];

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});

//keydown spacebar event
document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
  }
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomColor(colorsArray) {
  return colorArray[Math.floor(Math.random() * colorArray.length)];
}

function getDistance(x1, y1, x2, y2) {
  const xDististance = x2 - x1;
  const yDististance = y2 - y1;
  return Math.hypot(xDististance, yDististance);
}

class Particle {
  constructor(x, y, directionX, directionY, radius, color) {
    this.x = x;
    this.y = y;
    this.directionY = directionY;
    this.directionX = directionX;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    //ctx.stroke();
    ctx.closePath();
  }

  update() {
    if (this.y + this.directionY + this.radius > canvas.height || this.y < 0) {
      this.directionY = -this.directionY * friction;
    } else {
      this.directionY += gravity;
    }
    if (
      this.x + this.directionX + this.radius > canvas.width ||
      this.x - this.radius <= 0
    ) {
      this.directionX = -this.directionX * friction;
    }
    this.y += this.directionY;
    this.x += this.directionX * friction;
    this.draw();
  }
}

// Implementation (making the particlesArray to animate it later)
let particlesArray;
function init() {
  particlesArray = [];
  for (let i = 0; i < numberOfParticles; i++) {
    let radius = getRandomInt(); //put values
    let x = getRandomInt(20, canvas.width - radius); //the min value could change
    let y = getRandomInt(20, canvas.height - radius); //the min value could change
    let directionX = getRandomInt(); //put values
    let directionY = getRandomInt(); //put values
    let color = getRandomColor(colorArray);
    particlesArray.push(
      new Particle(x, y, directionX, directionY, radius, color)
    );
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height); //refresh canvas
  particlesArray.forEach((ptcl) => {
    ptcl.update(); //animation of every "particle (ptcl) in the particlesArray"
  });
}

init();
animate();
