const gameContainer = document.getElementById("gameContainer");
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const ball = document.getElementById("ball");
const upButton = document.getElementById("up");
const downButton = document.getElementById("down");

let player1Y = 200;
let player2Y = 200;
let ballX = 390;
let ballY = 240;
let ballSpeedX = 4;
let ballSpeedY = 4;

// Paddle movement for Player 1 (keyboard controls)
document.addEventListener("keydown", (e) => {
    if (e.key === "w" && player1Y > 0) player1Y -= 20;
    if (e.key === "s" && player1Y < 400) player1Y += 20;
    player1.style.top = player1Y + "px";
});

// Touch controls for Player 1
upButton.addEventListener("touchstart", () => {
    if (player1Y > 0) player1Y -= 20;
    player1.style.top = player1Y + "px";
});

downButton.addEventListener("touchstart", () => {
    if (player1Y < 400) player1Y += 20;
    player1.style.top = player1Y + "px";
});

// AI for Player 2
function moveAI() {
    const aiSpeed = 3; // Speed of the AI paddle
    if (ballY > player2Y + 50 && player2Y < 400) player2Y += aiSpeed;
    else if (ballY < player2Y + 50 && player2Y > 0) player2Y -= aiSpeed;

    player2.style.top = player2Y + "px";
}

// Ball movement
function updateBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with top and bottom walls
    if (ballY <= 0 || ballY >= 480) ballSpeedY *= -1;

    // Ball collision with paddles
    if (
        (ballX <= 30 && ballY + 20 >= player1Y && ballY <= player1Y + 100) ||
        (ballX >= 300 && ballY + 20 >= player2Y && ballY <= player2Y + 100)
    ) {
        ballSpeedX *= -1;
    }

    // Ball out of bounds (reset position)
    if (ballX <= 0 || ballX >= 780) {
        ballX = 390;
        ballY = 240;
        ballSpeedX *= -1;
    }

    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";
}

function gameLoop() {
    updateBall();
    moveAI();
    requestAnimationFrame(gameLoop);
}

gameLoop();
