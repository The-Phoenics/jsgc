import { CANVAS_CONTEXT as ctx } from "../Globals.js";

class Animator {
    constructor({ imageSrc, position, dimension, spritesheet }, scaleX = 1, scaleY = 1) {
        this.image = new Image()
        this.image.src = imageSrc
        this.isReady = false
        this.image.onload = () => {
            this.isReady = true
        }

        this.x = position.x
        this.y = position.y
        this.w = dimension.w;
        this.h = dimension.h;
        this.row = spritesheet.row;
        this.column = spritesheet.column;

        this.scaleX = scaleX;
        this.scaleY = scaleY;
        this.currentFrameX = 0
        this.currentFrameY = 0

        this.sx = 0;
        this.sy = 0;
        this.sw = this.image.width / this.column
        this.sh = this.image.height / this.row
        this.cropX = 0;
        this.cropY = 0;
        this.tmp = 0;
    }

    setPosition(x, y) {
        this.x = x
        this.y = y
    }

    // set which row to animate
    animateRow(row_number) {
        this.currentFrameY = row_number - 1
    }

    // change currentColLimit to change the no. of columns
    // available to animate in one row (current row)
    update(x, y, currentColLimit = this.column, animationFrequency = 15) {
        this.x = x
        this.y = y
        this.tmp++;
        if (this.tmp >= animationFrequency) {
            this.tmp = 0;
            this.currentFrameX++;
        }

        if (this.currentFrameX >= currentColLimit) {
            this.currentFrameX = 0;
        }
    }
    
    render() {
        (this.isReady)
        if (this.isReady) {
            // change the value of currentFrameY to switch row wise,
            // cuurentFrameX for switching column wise
            ctx.drawImage(
                this.image,
                (this.sx + this.cropX + this.sw * this.currentFrameX),
                (this.sy + this.cropY + this.sh * this.currentFrameY),
                this.sw,
                this.sh,
                this.x,
                this.y,
                this.w * this.scaleX,
                this.h * this.scaleY
            );
        }
    }
}

export default Animator