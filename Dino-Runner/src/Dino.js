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

        this.isDying = false
        
        this.isJumping = false
        this.jumpRemaining = 0
        this.jumpValue = 2
        this.jumpScaler = 0.1

        this.gravityValue = 0.3
        this.gravityScaler = 0.1
    }

    jump() {
        if (this.jumpRemaining > 0) {
            this.animator.y -= this.jumpValue 
            this.jumpRemaining -= this.jumpValue + this.jumpScaler    
            this.jumpScaler += 0.1
        } else {
            this.isJumping = false
            this.jumpScaler = 0.1
        }
    }

    isGrounded() {
        return this.animator.y < DINO_POS_Y && !this.isJumping
    }

    gravity() {
        if (this.isGrounded()) {
            this.animator.y += this.gravityValue + this.gravityScaler
            this.gravityScaler += 0.05
        } else {
            this.gravityScaler = 0.1
        }
    }

    update() {
        if (this.isJumping) {
            // jump state
            this.jump()
            this.animator.animateRow(2)
            this.animator.update(this.column, 20)
        } else if (this.isDying) {
            // dying state
            this.animator.animateRow(3)
            this.animator.update(3)
        } else {
            // run state (default)
            this.animator.animateRow(1)
            this.animator.update()
        }
        // gravity for dino
        this.gravity()
    }

    render() {
        if (this.animator.isReady) {
            this.animator.render()
        }
    }
}

export default Dino