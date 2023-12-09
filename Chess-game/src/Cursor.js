import { CANVAS_CONTEXT as ctx, CURSOR_WIDTH, CURSOR_HEIGHT, CANVAS as canvas, C_WIDTH } from "./Globals.js";

class Cursor {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.image = new Image()
        this.image.src = './img/cursor.png'
        this.update = this.update.bind(this)
        this.renderMouse = false

        canvas.addEventListener('mouseover', () => {
            this.renderMouse = true
        })
        canvas.addEventListener('mouseleave', () => {
            this.renderMouse = false
        })
        canvas.addEventListener('mousemove', this.update)
    }

    update(event) {
        // get mouse position relative to the canvas
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.x
        const mouseY = event.clientY - rect.y
  
        // Update cursor position
        this.x = mouseX - CURSOR_WIDTH  / 2
        this.y = mouseY - CURSOR_HEIGHT / 2
    }

    render() {
        if (this.renderMouse) {
            ctx.drawImage(
                this.image,
                0,
                0,
                this.image.width / 3,
                this.image.height,
                this.x,
                this.y,
                CURSOR_WIDTH,
                CURSOR_HEIGHT
            );
        }
    }
}

export default Cursor;