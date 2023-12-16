import { CANVAS_CONTEXT as ctx, DINO_POS_Y } from "./Globals.js"
import Animator from "./utils/Animator.js"

class Dino {
    constructor() {
        this.animator = new Animator({
            imageSrc: './img/dinospr.png',
            position: {
                x: 180,
                y: DINO_POS_Y
            },
            dimension: {
                w: 80,
                h: 80
            },
            spritesheet: {
                row: 3,
                column: 4
            }
            // 24 col total
        })

        this.isJumping = false
        this.isDying = false

        this.jumpRemaining = 0
        this.jumpValue = 2
    }

    jump() {
        if (this.jumpRemaining > 0) {
            this.animator.y -= this.jumpValue 
            this.jumpRemaining -= this.jumpValue           
        } else {
            this.isJumping = false
        }
    }

    gravity() {
        if (this.animator.y < DINO_POS_Y && !this.isJumping) {
            this.animator.y += this.jumpValue - 0.5
        }
    }

    update() {
        if (this.isJumping) {
            this.jump()
            this.animator.animateRow(2)
            this.animator.update(this.column, 20)
        } else if (this.isDying) {
            this.animator.animateRow(3)
            this.animator.update(3)
        } else {
            this.animator.animateRow(1)
            this.animator.update()
        }
        this.gravity()
    }

    render() {
        if (this.animator.isReady) {
            this.animator.render()
        }
    }
}

export default Dino