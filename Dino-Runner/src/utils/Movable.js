import { C_WIDTH, CANVAS_CONTEXT as ctx } from '../Globals.js'
import Drawable from './Drawable.js'

class Movable extends Drawable {
    constructor({ imgSrc, position, dimension, velocity }) {
        super({
            imgSrc, position, dimension
        })
        
        // set it to false if don't want to keep object in canvas
        // after it goes out from left side of canvas
        this.keepWithinCanvas = true;
        this.velX = velocity.x
        this.velY = velocity.y
    }

    setVelocity(velocity) {
        this.velX = velocity.x
        this.velY = velocity.y
    }

    update() {
        this.x += this.velX
        this.y += this.velY
        if (this.keepWithinCanvas) {
            // keep the movable within canvas
            if (this.x + this.w < C_WIDTH) {
                this.x = 5
            }
        }
    }

    debug() {
        console.log(`position:  ${this.x}, ${this.y}`)
        console.log(`dimension: ${this.w}, ${this.h}`)
        console.log(`velocity:  ${this.velX}, ${this.velY}`)
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
        )
    }
}

export default Movable
