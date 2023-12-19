import { DEBUG_MODE, DINO_POS_Y } from "./Globals.js"
import Animator from "./utils/Animator.js"
import Hitbox from "./utils/Hitbox.js"

class Dino {
    constructor() {
        this.x = 180
        this.y = DINO_POS_Y
        this.w = 80
        this.h = 80 
        this.animator = new Animator({
            imageSrc: './img/dinospr.png',
            position: {
                x: this.x,
                y: this.y
            },
            dimension: {
                w: this.w,
                h: this.h
            },
            spritesheet: {
                row: 3,
                column: 4
            }
            // 24 col total
        })

        this.hitbox = new Hitbox({
            position: {
                x: this.x,
                y: this.y
            },
            dimension: {
                w: this.w,
                h: this.h
            }
        }, 'green')

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
            this.y -= this.jumpValue 
            this.jumpRemaining -= this.jumpValue + this.jumpScaler    
            this.jumpScaler += 0.1
        } else {
            this.isJumping = false
            this.jumpScaler = 0.1
        }
    }

    isGrounded() {
        return this.y < DINO_POS_Y && !this.isJumping
    }

    gravity() {
        if (this.isGrounded()) {
            this.y += this.gravityValue + this.gravityScaler
            this.gravityScaler += 0.05
        } else {
            this.gravityScaler = 0.1
        }
    }
wv    
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
        // update animator
        this.animator.update(this.x, this.y)
        // update hitbox
        this.hitbox.update(this.x, this.y)
    }

    render() {
        if (this.animator.isReady) {
            this.animator.render()
        }
        if (DEBUG_MODE) {
            this.hitbox.render()
        }
    }
}

export default Dino