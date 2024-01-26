import Entity from './Entity.js'
import Animator from './Animator.js';
import Player from './Player.js';
import { aabb } from "./utils.js";
import { PLAYER_VEL_MAG } from './Player.js';

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

// globals
export const GRAVITY = 2;
export let GAME_OVER = false;

class Drawable {
    constructor({ imageSrc, position }) {
        this.image = new Image();
        this.image.src = imageSrc;
        this.position = position;
    }

    setPosition({ position }) {
        this.position = position;
    }

    render() {
        ctx.drawImage(this.image, this.position.x, this.position.y)
    }
}

// background
let background = new Drawable({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/background.png'
});

// shop
let shop = new Animator({
    position: {
        x: 700,
        y: 230
    },
    imageSrc: './img/shop.png',
    dimension: {
        w: 240,
        h: 250
    },
    spritesheet: {
        row: 1,
        column: 6
    }
});

// player
// let player = new Entity({
//     position: { x: 400, y: 400 },
//     dimension: { x: 50, y: 150 },
//     velocity: { x: 0, y: 0 },
//     color: 'blue'
// });


let player = new Player();

// enemy
let enemy = new Entity({
    position: { x: 600, y: 400 },
    dimension: { x: 50, y: 150 },
    velocity: { x: 0, y: 0 }
}, false)

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    }
}

// events
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'a':
            keys.a.pressed = true;
            player.lastKey = 'a';
            player.isFacingRight = false;
            break;

        case 'd':
            keys.d.pressed = true;
            player.lastKey = 'd';
            player.isFacingRight = true;
            break;

        case 'w':
            break;

        case ' ':
            player.isAttacking = true;
            break;

        // enemy:
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            enemy.lastKey = 'ArrowLeft';
            enemy.isFacingRight = false;
            break;

        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            enemy.lastKey = 'ArrowRight';
            enemy.isFacingRight = true;
            break;

        case 'ArrowDown':
            enemy.isAttacking = true;
            break;
    }
});

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'a':
            keys.a.pressed = false;
            break;

        case 'd':
            keys.d.pressed = false;
            break;

        case 'w':
            if (!player.isFalling) {
                player.jump();
            }
            break;

        // enemy:
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;

        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;

        case 'ArrowUp':
            if (!enemy.isFalling) {
                enemy.jump();
            }
            break;
    }
});

function runGame() {
    clear();
    player.update();
    enemy.update();
    shop.update();

    // move player
    player.velX = 0;
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velX = -PLAYER_VEL_MAG;
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velX = PLAYER_VEL_MAG;
    }

    // move enemy
    enemy.velX = 0;
    if (keys.ArrowLeft.pressed && enemy.lastKey == 'ArrowLeft') {
        enemy.velX = -1;
    } else if (keys.ArrowRight.pressed && enemy.lastKey == 'ArrowRight') {
        enemy.velX = 1;
    }

    // collision detection
    if (aabb({ rect1: player.weapon, rect2: enemy })
        && player.isAttacking) {
        enemy.health -= 20; // TODO: Use AttackValue variable
        if (enemy.health < 0) {
            enemy.health = 0;
            // player won
        }
        player.isAttacking = false;
        player.weapon.render(); // DBG
    }

    if (aabb({ rect1: enemy.weapon, rect2: player })
        && enemy.isAttacking) {
        player.health -= 20; // TODO: Use AttackValue variable
        if (player.health < 0) {
            player.health = 0;
            // player won
        }
        enemy.isAttacking = false;
        enemy.weapon.render(); // DBG
    }

    // ---------------------- RENDER ---------------------- // 
    background.render();
    shop.render();
    enemy.render();
    player.render();
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

function onGameOver() {
    const gameOverHeading = document.querySelector('h1');
    if (player.health > enemy.health) {
        gameOverHeading.style.display = 'block'
        gameOverHeading.innerText = 'Player 1 Won!'
        gameOverHeading.style.color = 'green'
    }
    else if (player.health < enemy.health) {
        gameOverHeading.style.display = 'block'
        gameOverHeading.innerText = 'Player 2 Won!'
        gameOverHeading.style.color = 'green'
    }
    else {
        gameOverHeading.style.display = 'block'
        gameOverHeading.innerText = 'Nobody Won!'
    }
}

animate();

// timer
setInterval(() => {
    const timer = document.getElementById('timer');
    if (timer.innerText > 0) {
        timer.innerText -= 1;
    } else {
        // Game Over
        GAME_OVER = true;
    }
}, 1000);
