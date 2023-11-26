import Entity from "./Entity.js";
import Paddle from "./Paddle.js";
import { aabb } from "./utils.js";

const canvas = document.querySelector('canvas');
export const ctx = canvas.getContext('2d');

export const CWIDTH = 1024;
export const CHEIGHT = 576;

canvas.width = CWIDTH;
canvas.height = CHEIGHT;

ctx.fillRect(0, 0, canvas.width, canvas.height);

function clear() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

let GAME_OVER = false;
export const PLATFORM_DIST_FROM_BOTTOM = 0;

// ----------------------------------------- //

let paddle = new Paddle();

let ball = new Entity({
    position: {
        x: 300,
        y: 300
    },
    dimension: {
        w: 25,
        h: 25
    },
    velocity: {
        x: 2,
        y: 2
    }
})


// game loop
function animate() {
    window.requestAnimationFrame(animate);

    if (!GAME_OVER) {
        runGame();
    }
    else {
        onGameOver();
    }
}

animate();

function runGame() {
    update();
    render();    
}

function update() {
    ball.update();
    ball.bounce();
    paddle.update();

    if (aabb({
        rect1: paddle,
        rect2: ball
    })) {
        ball.velY *= -1;
    }

    // game over
    if (ball.y + ball.h >= CHEIGHT) {
        GAME_OVER = true;
    }
}

function render() {
    clear();
    ball.render();
    paddle.render()
}

function onGameOver() {
    console.log('Game Over!!');
}

window.addEventListener('keydown', (e) => {
    if (e.key === 'd') {
        paddle.velX = 2
    }
    if (e.key === 'a') {
        paddle.velX = -2
    }
})
