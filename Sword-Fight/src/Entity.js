import HealthBar from "./HealthBar.js";
import { CWIDTH, CHEIGHT, GRAVITY, ctx } from "./index.js";

const PLAYER_JUMP_MAG = 8; // player jump magnitude
const JUMP_LIMIT = 140;
export const PLATFORM_DIST_FROM_BOTTOM = 96;

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

        this.image = new Image();

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

export default Entity;