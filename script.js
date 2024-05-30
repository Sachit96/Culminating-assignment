let basket, fruits = [], basketWidth = 100, basketHeight = 20, fruitSize = 20, score = 0, lives = 3, spawnInterval = 120;

function setup() {
  createCanvas(600, 400);
  basket = { x: width / 2, y: height - basketHeight, xdir: 0 };
  for (let i = 0; i < 3; i++) fruits.push({ x: random(width), y: 0, speed: random(1, 3) });
}

function draw() {
  background(220);
  fill(0);
  rect(basket.x, basket.y, basketWidth, basketHeight);
  basket.x += basket.xdir * 5;
  basket.x = constrain(basket.x, 0, width - basketWidth);

  for (let i = fruits.length - 1; i >= 0; i--) {
    let f = fruits[i];
    f.y += f.speed;
    fill(255, 0, 0);
    ellipse(f.x, f.y, fruitSize, fruitSize);

    if (f.y + fruitSize / 2 > basket.y && f.x > basket.x && f.x < basket.x + basketWidth) {
      score++;
      fruits.splice(i, 1);
    } else if (f.y > height) {
      lives--;
      fruits.splice(i, 1);
    }
  }

  if (frameCount % spawnInterval === 0) fruits.push({ x: random(width), y: 0, speed: random(1, 3) });

  fill(0);
  textSize(16);
  text(`Score: ${score}`, 10, 20);
  text(`Lives: ${lives}`, 10, 40);

  if (lives <= 0) {
    textSize(32);
    fill(255, 0, 0);
    text('Game Over', width / 2 - 80, height / 2);
    noLoop();
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) basket.xdir = -1;
  else if (keyCode === RIGHT_ARROW) basket.xdir = 1;
}

function keyReleased() {
  if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) basket.xdir = 0;
}
