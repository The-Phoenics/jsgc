import Entity from "./Entity.js";
import { C_WIDTH, CANVAS_CONTEXT as ctx } from "./Globals.js";;

class Paddle extends Entity {
    constructor() {
        super({
            position: {
                x: 500,
                y: 520
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
        })
    }

    update() {
        super.update();
        this.onHittingSideWalls();
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