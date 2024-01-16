import Movable from "./Movable.js";

class Parallax {
    constructor({ imgSrc, position, dimension, velocity }) {
        this.drawableOne = new Movable({
            imgSrc,
            position,
            dimension,
            velocity
        })
        this.drawableOne.keepWithinCanvas = false
        this.drawableTwo = new Movable({
            imgSrc,
            position,
            dimension,
            velocity
        })
        this.drawableTwo.keepWithinCanvas = false
        this.drawableTwo.x = this.drawableOne.w
        
    }

    setVelocity(velocity = { x: 0, y: 0 }) {
        this.drawableOne.setVelocity(velocity)
        this.drawableTwo.setVelocity(velocity)
    }

    repeatUpdate() {
        if (this.drawableOne.x + this.drawableOne.w <= 0) {
            this.drawableOne.x = this.drawableOne.w
        }
        if (this.drawableTwo.x + this.drawableOne.w <= 0) {
            this.drawableTwo.x = this.drawableTwo.w
        }
    }

    update() {
        this.drawableOne.update()
        this.drawableTwo.update()
        this.repeatUpdate()
    }

    render() {
        // draw first
        this.drawableOne.render()
        // draw second
        this.drawableTwo.render()
    }
}

export default Parallax
