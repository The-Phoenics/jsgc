const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const CWIDTH = 1024;
const CHEIGHT = 576;

canvas.width = CWIDTH;
canvas.height = CHEIGHT;

ctx.fillRect(0, 0, canvas.width, canvas.height);

function clear() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// globals
const GRAVITY = 2;
const PLAYER_VEL_MAG = 1; // player velocity magnitude
const PLAYER_JUMP_MAG = 8; // player jump magnitude
const JUMP_LIMIT = 140;
let GAME_OVER = false;
const PLATFORM_DIST_FROM_BOTTOM = 96;

class Vec2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    addInto(otherVec2) {
        this.x += otherVec2.x;
        this.y += otherVec2.y;
    }
}

class Weapon {
    constructor({ position, dimension, color = 'green' }) {
        this.x = position.x;
        this.y = position.y;
        this.w = dimension.w;
        this.h = dimension.h;
        this.color = color;
    }

    update({ position, dimension }) {
        this.x = position.x;
        this.y = position.y;
        this.w = dimension.w;
        this.h = dimension.h;
    }

    render() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}

class Entity {
    constructor({ position, dimension, velocity, color = 'red' }, isFacingRight = true) {
        this.x = position.x;
        this.y = position.y;
        this.w = dimension.x;
        this.h = dimension.y;
        this.velX = velocity.x;
        this.velY = velocity.y;
        this.color = color;
        this.lastKey = null;
        this.isAttacking = false;
        this.isFacingRight = isFacingRight;
        this.currentJumpMagnitude = 0;
        this.isFalling = false;
        this.health = 100;

        this.weapon = new Weapon({
            position: {
                x: this.x,
                y: this.y
            },
            dimension: {
                w: 100, // width & height of weapon rect
                h: 50
            }
        });

        this.healthBar = new HealthBar({
            position: {
                x: this.x,
                y: this.y
            },
            dimension: {
                w: this.w * 2,
                h: this.h / 20
            }
        });
    }

    update() {
        this.x += this.velX;
        this.y += this.velY;
        this.y += GRAVITY;
        this.currentJumpMagnitude += Math.abs(this.velY);
        if (this.currentJumpMagnitude >= JUMP_LIMIT) {
            this.velY = 0;
            this.currentJumpMagnitude = 0;
        }
        // update isFalling/isInAir
        this.isFalling = this.y + this.h < CHEIGHT - PLATFORM_DIST_FROM_BOTTOM;

        // keep Entity within windows bounds
        this.keepInBounds();

        // update weapon position left/right
        let weapon_xpos = this.x;
        if (!this.isFacingRight) {
            weapon_xpos = this.x - (this.weapon.w - this.w);
        }
        this.weapon.update({
            position: {
                x: weapon_xpos,
                y: this.y
            },
            dimension: {
                w: this.weapon.w,
                h: this.weapon.h
            }
        })

        // middle x-position
        let x_mid = this.x - (this.healthBar.w / 2 - this.w / 2);
        this.healthBar.update({
            position: {
                x: x_mid,
                y: this.y
            }
        }, this.health);
    }

    render() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        // this.weapon.render(); // DBG
        this.healthBar.render();
    }

    jump() {
        if (this.currentJumpMagnitude < JUMP_LIMIT) {
            this.velY = -5;
        }
    }

    keepInBounds() {
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.x > CWIDTH - this.w) {
            this.x = CWIDTH - this.w;
        }
        if (this.y < 0) {
            this.y = 0;
        }
        if (this.y > CHEIGHT - this.h - PLATFORM_DIST_FROM_BOTTOM) {
            this.y = CHEIGHT - this.h - PLATFORM_DIST_FROM_BOTTOM
        }
    }
}

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

class HealthBar {
    constructor({ position, dimension }, healthValue = 100) {
        this.x = position.x;
        this.y = position.y;
        this.w = dimension.w;
        this.h = dimension.h;
        this.bgcolor = 'white';
        this.healthColor = 'green';
        this.health = healthValue;
        this.offset = {
            x: 0,
            y: 20
        };
    }

    update({ position }, healthValue) {
        this.x = position.x - this.offset.x;
        this.y = position.y - this.offset.y;
        this.health = healthValue
    }

    render() {
        ctx.fillStyle = this.bgcolor;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        this.renderHealth();
    }

    renderHealth() {
        ctx.fillStyle = this.healthColor;
        let score_percent = (this.health / 100) * this.w;
        ctx.fillRect(this.x, this.y, this.health, this.h);
    }
}

class Animator {
    constructor({ imageSrc, position, dimension, spritesheet }, scale = 1) {
        this.position = position;
        this.image = new Image();
        this.scale = scale;
        this.image.src = imageSrc;
        this.currentFrameX = 0;
        this.currentFrameY = 0;
        this.row = spritesheet.row;
        this.column = spritesheet.column;
        this.w = dimension.w;
        this.h = dimension.h;

        this.sx = 0;
        this.sy = 0;
        this.sw = this.image.width / this.column
        this.sh = this.image.height / this.row

        this.tmp = 0;
    }

    update() {
        this.tmp++;
        if (this.tmp >= 2000) {
            this.tmp = 0;
            console.log(this.tmp);
            this.currentFrameX++;
        }

        if (this.currentFrameX >= this.column) {
            this.currentFrameX = 0;
        }
    }

    render() {
        ctx.drawImage(
            this.image,
            this.sx + this.sw * this.currentFrameX,
            this.sy + this.sh * this.currentFrameY,
            this.sw,
            this.sh,
            this.position.x,
            this.position.y,
            this.w,
            this.h
        );
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
    // dimension: {
    //     w: 240,
    //     h: 250
    // },
    dimension: {
        w: 440,
        h: 450
    },
    spritesheet: {
        row: 1,
        column: 6
    }
});

// player
let player = new Entity({
    position: { x: 400, y: 400 },
    dimension: { x: 50, y: 150 },
    velocity: { x: 0, y: 0 },
    color: 'blue'
});

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
    // console.log(e);
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
        console.log('Player attacked enemy');
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
        console.log('Enemy attacked player');
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

// aabb collision detection
function aabb({ rect1, rect2 }) {
    return (
        rect1.x < rect2.x + rect2.w &&
        rect1.x + rect1.w > rect2.x &&
        rect1.y < rect2.y + rect2.h &&
        rect1.y + rect1.h > rect2.y
    );
}
