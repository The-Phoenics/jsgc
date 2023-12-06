import { ctx } from "./index.js";

class Animator {
    constructor({ imageSrc, position, dimension, spritesheet }, scaleX = 1, scaleY = 1) {
        this.position = position;
        this.image = new Image();
        this.scaleX = scaleX;
        this.scaleY = scaleY;
        this.image.src = imageSrc;
        this.currentFrameX = 0;
        this.currentFrameY = 0;
        this.row = spritesheet.row;
        this.column = spritesheet.column;
        this.w = dimension.w;
        this.h = dimension.h;
        this.sx = 0;
        this.sy = 0;
        this.sw = this.image.width / this.column
        this.sh = this.image.height / this.row
        this.cropX = 0;
        this.cropY = 0;
        this.currentColLimit = this.column;
        this.tmp = 0;
    }

    setPosition({ position }) {
        this.position = position
    }

    update(currColLimit = this.column, animationFrequency = 15) {
        this.tmp++;
        if (this.tmp >= animationFrequency) {
            this.tmp = 0;
            console.log(this.tmp);
            this.currentFrameX++;
        }

        if (this.currentFrameX >= currColLimit) {
            this.currentFrameX = 0;
        }
    }

    render() {
        ctx.drawImage(
            this.image,
            (this.sx + this.cropX + this.sw * this.currentFrameX),
            (this.sy + this.cropY + this.sh * this.currentFrameY),
            this.sw,
            this.sh,
            this.position.x,
            this.position.y,
            this.w * this.scaleX,
            this.h * this.scaleY
        );
    }
}

export default Animator;