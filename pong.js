// Board
let board;
let boardWidth = 500;
let boardHeight = 500;
let context;

// Players / Paddles
let playerWidth = 10;
let playerHeight = 50;
let playerVelocityY = 0;

let player1 = {
  x: 10,
  y: boardHeight / 2,
  width: playerWidth,
  height: playerHeight,
  velocityY: playerVelocityY,
};

let player2 = {
  x: boardWidth - playerWidth - 10,
  y: boardHeight / 2,
  width: playerWidth,
  height: playerHeight,
  velocityY: playerVelocityY,
};

window.onload = () => {
  board = document.getElementById("board");
  board.height = boardHeight;
  board.width = boardWidth;
  context = board.getContext("2d"); // used for drawing on the board

  // draw initial player1 / paddle 1
  context.fillStyle = "#67b3b5";
  context.fillRect(player1.x, player1.y, player1.width, player1.height);

  requestAnimationFrame(update);
  document.addEventListener("keyup", movePlayer);
};

const update = () => {
  requestAnimationFrame(update);
  context.clearRect(0, 0, board.width, board.height);

  //player1 / paddle 1
  context.fillStyle = "#67b3b5";
  player1.y += player1.velocityY;
  context.fillRect(player1.x, player1.y, player1.width, player1.height);

  //player2 / paddle 2
  player2.y += player2.velocityY;
  context.fillRect(player2.x, player2.y, player2.width, player2.height);
};

const movePlayer = (e) => {
  //player1 / paddle1
  if (e.code == "KeyW") {
    player1.velocityY = -3;
  } else if (e.code == "KeyS") {
    player1.velocityY = 3;
  }

  //player2 / paddle2
  if (e.code == "ArrowUp") {
    player2.velocityY = -3;
  } else if (e.code == "ArrowDown") {
    player2.velocityY = 3;
  }
};
