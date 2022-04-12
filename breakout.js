const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
document.body.prepend(canvas);
const game = { grid: 40, ani: " " };
const player = {
  x: game.grid * 7,
  y: game.grid * 8,
  w: game.grid * 2,
  h: game.grid / 2,
  color: "orange",
  speed: 5,
};
const keyz = { ArrowLeft: false, ArrowRight: false };

canvas.setAttribute("width", game.grid * 15);
canvas.setAttribute("height", game.grid * 10);
canvas.style.border = "1px solid black";

document.addEventListener("mousemove", (e) => {
  const val = e.clientX - canvas.offsetLeft;
  if (val > player.w && val < canvas.width) {
    player.x = val - player.w;
    console.log(player.x);
  }
});

document.addEventListener("keydown", (e) => {
  if (e.code in keyz) {
    keyz[e.code] = true;
    console.log(keyz);
  }
});
document.addEventListener("keyup", (e) => {
  if (e.code in keyz) {
    keyz[e.code] = false;
    console.log(keyz);
  }
});

game.ani = requestAnimationFrame(draw);

function movement() {
  if (keyz.ArrowLeft && player.x > 0) {
    player.x -= player.speed;
  }
  if (keyz.ArrowRight && player.x < canvas.width - player.w) {
    player.x += player.speed;
    console.log(player.x);
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  movement();
  ctx.beginPath();
  ctx.rect(player.x, player.y, player.w, player.h);
  ctx.fillStyle = player.color;
  ctx.fill();
  ctx.closePath();
  game.ani = requestAnimationFrame(draw);
}
