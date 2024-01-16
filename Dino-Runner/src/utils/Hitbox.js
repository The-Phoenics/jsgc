import { CANVAS_CONTEXT as ctx } from "../Globals.js"

class Hitbox {
    constructor({ position, dimension, offset = { top: 0, bottom: 0, left: 0, right: 0} }, color = 'black') {
        this.x = position.x
        this.y = position.y
        this.w = dimension.w
        this.h = dimension.h
        this.color = color
        this.offset = {
            top: offset.top,
            bottom: offset.bottom,
            left: offset.left,
            right: offset.right
        }
        this.initWithOffset()
    }

    initWithOffset() {
        // change position and dimension with respective offsets
        this.x = this.x - this.offset.left,
        this.y = this.y - this.offset.top,
        this.w = this.w + this.offset.right  + this.offset.left,
        this.h = this.h + this.offset.bottom + this.offset.top
    }

    setPosition(x, y) {
        this.x = x - this.offset.left
        this.y = y - this.offset.top
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

export default Hitbox;
