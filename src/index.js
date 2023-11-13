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
const JUMP_LIMIT = 100;

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
        this.w = dimension.x;
        this.h = dimension.y;
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
        this.weapon = new Weapon({
            position: {
                x: this.x,
                y: this.y
            },
            dimension: {
                x: 100, // width & height of weapon rect
                y: 50
            }
        });
    }

    update() {
        this.x += this.velX;
        this.y += this.velY;
        this.y += GRAVITY;
        this.keepInBounds();
        
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
    }

    render() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        this.weapon.render();
    }

    jump() {
        if (this.currentJumpMagnitude < JUMP_LIMIT) {
            this.velY = -5;
            this.currentJumpMagnitude += Math.abs(this.velY);
        }
        else {
            this.velY = 0;
            this.currentJumpMagnitude = 0;
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
        if (this.y > CHEIGHT - this.h) {
            this.y = CHEIGHT - this.h
        }
    }
}

// player
let player = new Entity({
    position: { x: 400, y: 400 },
    dimension: { x: 50, y: 100 },
    velocity: { x: 0, y: 0 },
    color: 'blue'
});

// enemy
let enemy = new Entity({
    position: { x: 600, y: 400 },
    dimension: { x: 50, y: 100 },
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
            // player.velY = -PLAYER_JUMP_MAG;
            player.jump();
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

        case 'ArrowUp':
            enemy.velY = -5;
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
            player.velY = 0;
            break;

        // case ' ':
        //     player.isAttacking = true;
        //     break;
        
        // enemy:
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;

        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;

        case 'ArrowUp':
            enemy.velY = 0;
            break;

        // case 'ArrowDown':
        //     enemy.isAttacking = true;
        //     break;
    }
});

// game loop
function animate() {
    window.requestAnimationFrame(animate);
    clear();
    player.update();
    enemy.update();

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
        && player.isAttacking)
    {
        player.isAttacking = false;
        console.log('Player attacked enemy');
    }

    if (aabb({ rect1: enemy.weapon, rect2: player })
        && enemy.isAttacking)
    {
        enemy.isAttacking = false;
        console.log('Enemy attacked player');
    }

    enemy.render();
    player.render();
}

animate();

// utilities
function aabb({ rect1, rect2 }) {
    return (
        rect1.x < rect2.x + rect2.w &&
        rect1.x + rect1.w > rect2.x &&
        rect1.y < rect2.y + rect2.h &&
        rect1.y + rect1.h > rect2.y
    );
}
