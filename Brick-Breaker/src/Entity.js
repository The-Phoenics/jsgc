import { PLATFORM_DIST_FROM_BOTTOM } from "./index.js";
import { C_WIDTH, C_HEIGHT, CANVAS_CONTEXT as ctx } from "./Globals.js";;

class Entity {
    constructor({ position, dimension, velocity, color = 'red' }, imageSrc, isCircular = false, radius = 10) {
        this.x = position.x;
        this.y = position.y;
        this.w = dimension.w;
        this.h = dimension.h;
        this.velX = velocity.x;
        this.velY = velocity.y;
        this.color = color;
        this.isFalling = false;
        this.health = 100;
        this.isCircular = isCircular
        this.radius = radius

        this.image = new Image();
        this.image.src = imageSrc;
    }

    update() {
        this.x += this.velX;
        this.y += this.velY;
    }

    render() {
        ctx.drawImage(
            this.image,
            0,
            0,
            this.image.width,
            this.image.height,
            this.x,
            this.y,
            this.w,
            this.h
        );

    }

    keepInBounds() {
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.x > C_WIDTH - this.w) {
            this.x = C_WIDTH - this.w;
        }
        if (this.y < 0) {
            this.y = 0;
        }
        if (this.y > C_HEIGHT - this.h - PLATFORM_DIST_FROM_BOTTOM) {
            this.y = C_HEIGHT - this.h - PLATFORM_DIST_FROM_BOTTOM
        }
    }

    bounce() {
        if (this.x < 0) {
            this.velX *= -1;
        }
        if (this.x > C_WIDTH - this.w) {
            this.velX *= -1;
        }
        if (this.y < 0) {
            this.velY *= -1
        }
        if (this.y > C_HEIGHT - this.h - PLATFORM_DIST_FROM_BOTTOM) {
            this.y = C_HEIGHT - this.h - PLATFORM_DIST_FROM_BOTTOM
            this.velY *= -1;
        }
    }
}

export default Entity;