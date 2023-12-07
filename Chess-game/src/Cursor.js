import { CANVAS_CONTEXT as ctx, CANVAS as canvas } from "./Globals.js";

const CURSOR_WIDTH  = 32 * 1.5
const CURSOR_HEIGHT = 32 * 1.5

class Cursor {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.image = new Image()
        this.image.src = './img/cursor.png'
        this.update = this.update.bind(this)
        // Event listener to track mouse movement
        canvas.addEventListener('mousemove', this.update)
    }

    update(event) {
        // Get mouse position relative to the canvas
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.x;
        const mouseY = event.clientY - rect.y;
  
        // Update object position
        this.x = mouseX - CURSOR_WIDTH  / 2;
        this.y = mouseY - CURSOR_HEIGHT / 2;
    }

    render() {
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

export default Cursor;