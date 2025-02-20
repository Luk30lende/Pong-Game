// Board
let board;
let boardWidth = 500;
let boardHeight = 500;
let context;

// Players / Paddles
let playerWidth = 10;
let playerHeight = 50;
let playerVelocityY = 3; // Movement speed

// AI/Computer player
let player1 = {
  x: 10,
  y: boardHeight / 2 - playerHeight / 2,
  width: playerWidth,
  height: playerHeight,
  velocityY: 2, // AI/Computer Speed
};

// Human player
let player2 = {
  x: boardWidth - playerWidth - 10,
  y: boardHeight / 2 - playerHeight / 2,
  width: playerWidth,
  height: playerHeight,
  velocityY: 0,
};

// Ball
let ballWidth = 10;
let ballHeight = 10;
let ball = {
  x: boardWidth / 2,
  y: boardHeight / 2,
  width: ballWidth,
  height: ballHeight,
  velocityX: 1.5,
  velocityY: 2,
};

// Score
let player1Score = 0;
let player2Score = 0;

window.onload = () => {
  board = document.getElementById("board");
  board.height = boardHeight;
  board.width = boardWidth;
  context = board.getContext("2d"); // used for drawing on the board

  // draw initial player1 / paddle 1
  // context.fillStyle = "#67b3b5";
  // context.fillRect(player1.x, player1.y, player1.width, player1.height);

  requestAnimationFrame(update);
  document.addEventListener("keyup", movePlayer);
  document.addEventListener("keydown", stopPlayer);
};

const update = () => {
  requestAnimationFrame(update);
  context.clearRect(0, 0, board.width, board.height);

  // AI/Computer movement (Player 1)
  moveAI();
  context.fillStyle = "#67b3b5";
  context.fillRect(player1.x, player1.y, player1.width, player1.height);

  //Human player (Player 2)
  let nextPlayer2Y = player2.y + player2.velocityY;
  if (!outOfBounds(nextPlayer2Y)) {
    player2.y = nextPlayer2Y;
  }
  context.fillRect(player2.x, player2.y, player2.width, player2.height);

  // Ball movement
  context.fillStyle = "whitesmoke";
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;
  context.fillRect(ball.x, ball.y, ball.width, ball.height);

  // Ball collision (Walls/top and bottom of canvas)
  if (ball.y <= 0 || ball.y + ball.height >= boardHeight) {
    ball.velocityY *= -1; // reverse direction
  }

  // Ball collision (Paddles)
  if (detectCollision(ball, player1) && ball.velocityX < 0) {
    ball.velocityX *= -1.1; // Increase speed on hit
  } else if (detectCollision(ball, player2) && ball.velocityX > 0) {
    ball.velocityX *= -1.1;
  }

  // Scoring and game over
  if (ball.x < 0) {
    player2Score++;
    resetGame(1);
  } else if (ball.x + ball.width > boardWidth) {
    player1Score++;
    resetGame(-1);
  }

  // Display score
  context.font = "45px sans-serif";
  context.fillText(player1Score, boardWidth / 5, 45);
  context.fillText(player2Score, (boardWidth * 4) / 5 - 45, 45);

  // Display middle dotted line
  for (let i = 0; i < board.height; i += 25) {
    // i = starting y position, draw a square every 25px downwards
    // (x position = half of boardWidth - 10), i = y position, width = 5px, height = 5px
    context.fillRect(board.width / 2 - 10, i, 5, 5);
  }
};

// AI movement (Follows the ball with randomness to be "east")
const moveAI = () => {
  let targetY = ball.y - player1.height / 2; // AI/Computer follows the ball's y position
  let error = Math.random() * 10 - 5; // Small randomness for easy difficulty
  targetY += error;

  if (player1.y < targetY) {
    player1.y += player1.velocityY;
  } else if (player1.y > targetY) {
    player1.y -= player1.velocityY;
  }

  if (outOfBounds(player1.y)) {
    player1.y = Math.max(0, Math.min(boardHeight - playerHeight, player1.y));
  }
};

// Human player movement
const movePlayer = (e) => {
  if (e.code === "ArrowUp") {
    player2.velocityY = -playerVelocityY;
  } else if (e.code === "ArrowDown") {
    player2.velocityY = playerVelocityY;
  }
};

const stopPlayer = (e) => {
  if (e.code === "ArrowUp" || e.code === "ArrowDown") {
    player2.velocityY = 0;
  }
};

// Collision detection
const detectCollision = (a, b) => {
  return (
    a.x < b.x + b.width && // a's top left corner doesn't reach b's top right corner
    a.x + a.width > b.x && // a's top right corner passes b's top left corner
    a.y < b.y + b.height && // a's top left corner doesn't reach b's bottom left corner
    a.y + a.height > b.y // a's bottom left corner passes b's top left corner
  );
};

// Check if paddle is out of bounds
const outOfBounds = (yPosition) => {
  return yPosition < 0 || yPosition + playerHeight > boardHeight;
};

// Reset game
const resetGame = (direction) => {
  ball = {
    x: boardWidth / 2,
    y: boardHeight / 2,
    width: ballWidth,
    height: ballHeight,
    velocityX: direction,
    velocityY: 2,
  };
};
