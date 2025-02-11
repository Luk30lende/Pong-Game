// Board
let board;
let boardWidth = 500;
let boardHeight = 500;
let context;

// Players / Paddle
let playerWidth = 10;
let playerHeight = 50;

let player1 = {
  x: 10,
  y: boardHeight / 2,
  width: playerWidth,
  height: playerHeight,
};

let player2 = {
  x: boardWidth - playerWidth - 10,
  y: boardHeight / 2,
  width: playerWidth,
  height: playerHeight,
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
};

const update = () => {
  requestAnimationFrame(update);

  //player1 / paddle 1
  context.fillStyle = "#67b3b5";
  context.fillRect(player1.x, player1.y, player1.width, player1.height);

  //player2 / paddle 2
  context.fillRect(player2.x, player2.y, player2.width, player2.height);
};
