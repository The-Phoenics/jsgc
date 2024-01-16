import { C_WIDTH, DINO_POS_Y, DEBUG_MODE } from "./Globals.js"
import Animator from "./utils/Animator.js";
import Hitbox from "./utils/Hitbox.js";

class Zombie {
    constructor(x) {
        this.x = x
        this.y = DINO_POS_Y + 10
        this.w = 60
        this.h = 60
        this.hasCollided = false;

        // zombie animator
        this.animator = new Animator({
            imageSrc: './img/zombie_run.png',
            position: {
                x: this.x,
                y: this.y
            },
            dimension: {
                w: this.w,
                h: this.h
            },
            spritesheet: {
                row: 1,
                column: 4
            }
        })

        // zombie velocity
        this.velX = -2

        // enemy hitbox
        this.hitbox = new Hitbox({
            position: {
                x: this.x,
                y: this.y
            },
            dimension: {
                w: this.w,
                h: this.h
            },
            offset: {
                top:    -10,
                bottom: -10,
                left:   -12,
                right:  -10
            }
        }, 'red')
    }

    increaseVelX(value = 0.1) {
        this.velX -= value
    }

    update() {
        if (this.x + this.w < 0) {
            // TODO: spawn at a random place to right of the window
            // this.x = C_WIDTH + Math.floor(Math.random() * 30 + 5)
        }
        this.x += this.velX
        // update animator
        this.animator.update(this.x, this.y)
        // update hitbox
        this.hitbox.update(this.x, this.y)
    }

    render() {
        this.animator.render()
        if (DEBUG_MODE) {
            this.hitbox.render()
        }
    }
}

export default Zombie
