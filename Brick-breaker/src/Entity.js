import { CWIDTH, CHEIGHT, ctx, PLATFORM_DIST_FROM_BOTTOM } from "./index.js";

class Entity {
    constructor({ position, dimension, velocity, color = 'red' }) {
        this.x = position.x;
        this.y = position.y;
        this.w = dimension.w;
        this.h = dimension.h;
        this.velX = velocity.x;
        this.velY = velocity.y;
        this.color = color;
        this.isFalling = false;
        this.health = 100;
    }

    update() {
        this.x += this.velX;
        this.y += this.velY;
    }

    render() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
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

    bounce() {
        if (this.x < 0) {
            this.velX *= -1;
        }
        if (this.x > CWIDTH - this.w) {
            this.velX *= -1;
        }
        if (this.y < 0) {
            this.velY *= -1
        }
        if (this.y > CHEIGHT - this.h - PLATFORM_DIST_FROM_BOTTOM) {
            this.y = CHEIGHT - this.h - PLATFORM_DIST_FROM_BOTTOM
            this.velY *= -1;
        }
    }
}

export default Entity;