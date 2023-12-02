import Entity from "./Entity.js";
import { C_HEIGHT, C_WIDTH, CANVAS_CONTEXT as ctx } from "./Globals.js";

export const PADDLE_XPOS = C_WIDTH / 2 - (100 / 2);

class Paddle extends Entity {
    constructor() {
        super({
            position: {
                x: PADDLE_XPOS,
                y: C_HEIGHT - 50
            },
            dimension: {
                w: 100,
                h: 15
            },
            velocity: {
                x: 0,
                y: 0
            },
            color: 'white'
        }, './img/paddle.png')
    }

    update() {
        super.update();
        this.onHittingSideWalls();
    }

    reset() {
        this.velX = 0;
        this.velY = 0;
        this.x = PADDLE_XPOS,
        this.y = C_HEIGHT - 50
    }

    onHittingSideWalls() {
        if (this.x < 0) {
            this.velX *= -1;
        }
        if (this.x + this.w >= C_WIDTH) {
            this.velX *= -1;
        }
    }
}

export default Paddle;