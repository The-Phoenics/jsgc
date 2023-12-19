import Entity from "./Entity.js";
import Paddle from "./Paddle.js";
import Brick from "./Brick.js";
import { aabb } from "./utils.js";

import { PADDLE_XPOS } from "./Paddle.js";
import { HORIZONTAL_BRICK_MARGIN, VERTICAL_BRICK_MARGIN, brickWidth, ROW, COL } from "./Brick.js";
import { C_WIDTH, C_HEIGHT, CANVAS_CONTEXT as ctx } from "./Globals.js";
import { clear_canvas } from "./Globals.js";
import { play_hit_audio } from "./Globals.js";

// ----------------------------------------- //

export const PLATFORM_DIST_FROM_BOTTOM = 0;
export let GAME_OVER = false;
let GAME_START = false;

// heading elements
const controls = document.querySelectorAll('.controls') 

// paddle position + half of paddle width - half of ball radius
const BALL_POSX = PADDLE_XPOS + 50 - 12

// ----------------------------------------- //

// background
const imageBackg = new Image();
imageBackg.src = './img/space_background.png';
function drawBackground() {
    ctx.drawImage(
        imageBackg,
        0,
        0,
        imageBackg.width,
        imageBackg.height,
        0,
        0,
        C_WIDTH,
        C_HEIGHT
    );
}

// paddle
const paddle = new Paddle();

// ball
const ball = new Entity({
    position: {
        x: BALL_POSX,
        y: C_HEIGHT - 80
    },
    dimension: {
        w: 25,
        h: 25
    },
    velocity: {
        x: 1.5,
        y: -1.5
    },
}, './img/ball.png', true)

// bricks
let bricks = [];
function initBricks() {
    let x = 10;
    let y = 0;
    for (let i = 0; i < ROW; i++) {
        y += VERTICAL_BRICK_MARGIN;
        x = 10;
        for (let i = 0; i < COL; i++) {
            let brick = new Brick(x, y);
            bricks.push(brick)
            x += brickWidth + HORIZONTAL_BRICK_MARGIN
        }
    }
}
initBricks();

function renderBricks() {
    bricks.forEach(brick => {
        if (brick.isAlive)
            brick.render()
    })
}

function resetGame() {
    // reset ball
    ball.x = BALL_POSX
    ball.y = C_HEIGHT - 80
    ball.velX = 1.5
    ball.velY = -1.5

    paddle.reset();
    bricks = [];
    initBricks();
    GAME_START = false;
}

// ----------------- Game Loop ----------------- //
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
    if (GAME_START) {
        update();
    }
    gameControls()
    render()
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
        if (brick.isAlive) {
            if (aabb({rect1: brick, rect2: ball})) {
                play_hit_audio()
                brick.health -= 1;
                brick.switchBrickImage();
                ball.velY *= -1
            }
        }
    })
}

// ----------------- Render ----------------- //
function render() {
    clear_canvas()
    drawBackground();
    renderBricks()
    ball.render()
    paddle.render()
}

function onGameOver() {
    resetGame();
    render();
}

function gameControls() {
    if (GAME_START) {
        controls.forEach(item => {
            item.style.display = 'none';
        })
    } else {
        controls.forEach(item => {
            item.style.display = 'block';
        })
    }
}

// ----------------- Events ----------------- //
window.addEventListener('keydown', (e) => {
    GAME_START = true;
    if (e.key === 'd' || e.key === 'ArrowRight') {
        console.log(e.key)
        paddle.velX = 2
        GAME_OVER = false
    }
    if (e.key === 'a' || e.key === 'ArrowLeft') {
        paddle.velX = -2
        GAME_OVER = false
    }
})
