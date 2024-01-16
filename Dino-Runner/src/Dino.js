import { DEBUG_MODE, DINO_POS_Y } from "./Globals.js"
import Animator from "./utils/Animator.js"
import Hitbox from "./utils/Hitbox.js"
import Health from "./utils/Health.js"
import { aabb } from "./utils/Collision.js"

class Dino {
    constructor() {
        this.x = 180
        this.y = DINO_POS_Y
        this.w = 80
        this.h = 80
        // initialize dino
        this.init();
        // velocity
        this.VEL_Y = -6
        this.velocity = {
            x: 0,
            y: this.VEL_Y 
        }
        this.gravity = 2;
        // health for dino
        this.health = new Health();
        this.isJumping = false;
        this.JUMP_LIMIT = DINO_POS_Y - 150;
        this.isDying = false
    }

    init() {
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
            },
            offset: {
                top:    -23,
                bottom: -23,
                left:   -23,
                right:  -23
            }
        }, 'green')
    }

    jump() {
        if (this.y < this.JUMP_LIMIT) {
            this.velocity.y = 1
            //var dropVel = function() { this.velocity.y = 10 }
            //setTimeout(dropVel, 50)
        }
        this.y += this.gravity 
        this.y += this.velocity.y

        if (this.y > DINO_POS_Y) {
            this.isJumping = false
            this.velocity.y = this.VEL_Y 
            this.y = DINO_POS_Y
        }
    }

    isGrounded() {
        return this.y == DINO_POS_Y
    }

    update(zombieArray) {
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
        // update animator
        this.animator.update(this.x, this.y)
        // update hitbox
        this.hitbox.update(this.x, this.y)
        // update collision
        this.updateCollision(zombieArray)
    }

    updateCollision(zombieArray) {
        for (let i = 0; i < zombieArray.length; i++) {
            let zombie = zombieArray[i]
            if (!zombie.hasCollided && this.isColliding(zombie)) {
                console.log("Collided!");
                this.health.reduceHealth();
                zombie.hasCollided = true;
            }
        }
    }

    isColliding(zombie) {
        return aabb({
            rect1: zombie.hitbox,
            rect2: this.hitbox
        });
    }

    render() {
        if (this.animator.isReady) {
            this.animator.render()
        }
        if (DEBUG_MODE) {
            this.hitbox.render()
        }
        // render dino health
        this.health.render();
    }
}

export default Dino
