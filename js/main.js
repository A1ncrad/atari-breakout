const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

setCanvasSize();
window.addEventListener("resize", setCanvasSize);
setInterval(draw, 20);

let isGameStarted = false;

let board = {
  width: 200,
  height: 20,
  velocity: 0,
};

board.x = canvas.width / 2 - board.width / 2;
board.y = canvas.height - board.height;

let ball = {
  width: 20,
  height: 20,
  xVelocity: 10,
  yVelocity: 0,
};

ball.x = canvas.width / 2 - ball.width / 2;
ball.y = board.y - ball.height;

document.addEventListener("keydown", (e) => {
  console.log(e.key);

  switch (e.key) {
    case "ArrowRight":
      board.velocity = 10;
      isBallMoving = true;
      break;
    case "ArrowLeft":
      board.velocity = -10;
      isBallMoving = true;
      break;
    case " ":
			if (isGameStarted) return;

      isGameStarted = true;
      ball.yVelocity = -10;
      break;
    default:
      return;
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key == "ArrowLeft" || e.key == "ArrowRight") {
    board.velocity = 0;
  }
});

function setCanvasSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#fff";
  ctx.fillRect(board.x, board.y, board.width, board.height);
  ctx.fillRect(ball.x, ball.y, ball.width, ball.height);

  updateBoardPosition();
  updateBallPosition();
}

function updateBallPosition() {
  if (ball.y < 0) ball.yVelocity = -ball.yVelocity;
  if (
    ball.y > board.y - board.height &&
    board.x < ball.x && ball.x < board.x + board.width
  ) {
    ball.yVelocity = -ball.yVelocity;
  }
	if (ball.x < 0) ball.xVelocity = -ball.xVelocity;
	if (ball.x + ball.width > canvas.width) ball.xVelocity = -ball.xVelocity;

  ball.y += ball.yVelocity;
	ball.x += ball.xVelocity;

  if (isGameStarted && isBallMoving) return;



  if (ball.x <= board.x) {
		ball.x = board.x
    ball.xVelocity = -ball.xVelocity;
  }

  if (ball.x + ball.width >= board.x + board.width) {
    ball.xVelocity = -ball.xVelocity;
  }
}

function updateBoardPosition() {
  board.x += board.velocity;

	if(isGameStarted) return;

	ball.x += board.velocity;
}

draw();
