import { C_HEIGHT, C_WIDTH, CANVAS_CONTEXT as ctx, DINO_POS_Y } from "./Globals.js"
import Animator from "./utils/Animator.js";

class Zombie {
    constructor() {
        this.animator = new Animator({
            imageSrc: './img/zombie_run.png',
            position: {
                x: 700,
                y: DINO_POS_Y + 10
            },
            dimension: {
                w: 60,
                h: 60
            },
            spritesheet: {
                row: 1,
                column: 4
            }
        })
        this.velX = -1.5
    }

    update() {
        if (this.animator.x + this.animator.w < 0) {
            this.animator.x = C_WIDTH + Math.floor(Math.random() * 30 + 5)
        }
        this.animator.x += this.velX
        this.animator.update()
    }

    render() {
        this.animator.render()
    }
}

export default Zombie