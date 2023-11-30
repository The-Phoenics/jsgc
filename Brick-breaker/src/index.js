import Entity from "./Entity.js";
import Paddle from "./Paddle.js";
import Brick from "./Brick.js";
import { aabb } from "./utils.js";

import { MARGIN, brickHeight, brickWidth, ROW, COL, TOTAL_BRICKS } from "./Brick.js";
import { C_WIDTH, C_HEIGHT, CANVAS_CONTEXT as ctx, CANVAS as canvas } from "./Globals.js";
import { clear_canvas } from "./Globals.js";

export const PLATFORM_DIST_FROM_BOTTOM = 0;
export let GAME_OVER = false;

ctx.fillRect(0, 0, canvas.width, canvas.height);

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
}, true)

const bricks = [];
function initBricks() {
    let x = 10;
    let y = 200;
    for (let i = 0; i < 5; i++) {
        let brick = new Brick(x, y);
        bricks.push(brick)
        x += brickWidth + MARGIN
    }
}
initBricks();

function renderBricks() {
    bricks.forEach(brick => {
        brick.render()
    })
}

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

// ----------------- Update ----------------- //
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
    if (ball.y + ball.h >= C_HEIGHT) {
        GAME_OVER = true;
    }

    bricks.forEach(brick => {
        if (aabb({rect1: brick, rect2: ball})) {
            console.log('Collided!')
            ball.velY *= -1
        }
    })
}

// ----------------- Render ----------------- //
function render() {
    clear_canvas()
    renderBricks()
    ball.render()
    paddle.render()
}

function onGameOver() {
    console.log('Game Over!!');
}

// ----------------- Events ----------------- //
window.addEventListener('keydown', (e) => {
    if (e.key === 'd') {
        paddle.velX = 2
    }
    if (e.key === 'a') {
        paddle.velX = -2
    }
})
