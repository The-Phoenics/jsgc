import { CANVAS_CONTEXT as ctx } from "../Globals.js"

class Hitbox {
    constructor({ position, dimension }, color = 'black') {
        this.x = position.x
        this.y = position.y
        this.w = dimension.w
        this.h = dimension.h
        this.color = color
    }

    setPosition(x, y) {
        this.x = x
        this.y = y
    }

    setDimension(w, h) {
        this.w = w
        this.h = h
    }

    update(x, y) {
        this.setPosition(x, y)
    }

    render() {
        ctx.strokeStyle = this.color
        ctx.strokeRect(
            this.x,
            this.y,
            this.w,
            this.h
        )
    }
}

export default Hitbox