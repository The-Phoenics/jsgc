import { CANVAS_CONTEXT as ctx } from '../Globals.js'

class Drawable {
    constructor({ imgSrc, position, dimension }) {
        // position of drawable
        this.x = position.x
        this.y = position.y
        // width and height of drawable
        this.w = dimension.w
        this.h = dimension.h
        this.image = new Image()
        this.image.src = imgSrc
    }

    debug() {
        console.log(`position: ${this.x}, ${this.y}`)
        console.log(`dimension: ${this.w}, ${this.h}`)
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

export default Drawable