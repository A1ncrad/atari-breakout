const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

setCanvasSize();
window.addEventListener("resize", setCanvasSize);



let board = {
	width: 200,
	height: 20,
	velocity: 10,
}

board.x = canvas.width / 2 - board.width / 2;
board.y = canvas.height - board.height;


let ball = {
	width: 20,
	height: 20,
	velocity: 15,
}

ball.x = canvas.width / 2 - ball.width / 2;
ball.y = board.y - ball.height;



document.addEventListener("keydown", (e) => {
	switch (e.key) {
		case "ArrowRight":
			board.x += board.velocity;
			break;
		case "ArrowLeft":
			board.x -= board.velocity;
			break;
		default:
			return;
	}

	updateBallPosition();
	draw();
})



function setCanvasSize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	ctx.fillStyle = "#fff";
	ctx.fillRect(board.x, board.y, board.width, board.height);
	ctx.fillRect(ball.x, ball.y, ball.width, ball.height);
}

function updateBallPosition() {
	if (ball.x < board.x) {
		for (let i = 1; i <= 10; i++) {
			ball.x = board.x;

			setTimeout(() => ball.x += ball.velocity, 40 * i);
		}
	}

		if (ball.x > board.x + board.width - ball.width) {
			ball.x = board.x + board.width - ball.width;

      for (let i = 1; i <= 10; i++) {
        setTimeout(() => (ball.x -= ball.velocity), 40 * i);
      }
    }
}

draw();