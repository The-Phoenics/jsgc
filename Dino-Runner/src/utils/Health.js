import Drawable from "././Drawable.js"
import { DEBUG_MODE } from "../Globals.js"

class Heart {
    constructor({ position, dimension }) {
        this.isFull = true;
        this.position = {
            x: position.x,
            y: position.y
        }
        this.dimension = {
            w: dimension.w,
            h: dimension.h
        }
        this.heartFull = new Drawable({
            imgSrc: "./img/heart-full.png",
            position,
            dimension
        })
        this.heartEmpty = new Drawable({
            imgSrc: "./img/heart-empty.png",
            position,
            dimension
        })
    }

    render() {
        if (this.isFull) {
            this.heartFull.render();
        } else {
            this.heartEmpty.render();
        }
    }

    setToEmpty() {
        this.isFull = false;
    }

    setToFull() {
        this.isFull = true;
    }

    isHeartFull() {
        return this.isFull;
    }
}

// Health
class Health {
    constructor() {
        this.healthCount = 5;
        this.value = this.healthCount;
        this.gap = 1;
        this.dimension = {
            w: 25,
            h: 25
        }
        this.position = {
            x: 40,
            y: 30
        }
        this.hearts = new Array();
        // initialize hearts
        this.init();
    }

    init() {
        for (let i = 0; i < this.healthCount; i++) {
            let pos;
            if (i == 0)
                pos = this.position
            else {
                let xpos = this.hearts[i - 1].position.x + this.position.x + this.gap;
                let ypos = this.position.y;
                pos = {
                    x: xpos,
                    y: ypos
                }
            }

            let heart = new Heart({
                position: pos,
                dimension: this.dimension
            });
            this.hearts.push(heart)
        }
    }

    reduceHealth() {
        if (this.value > 0) {
            this.value--;
            this.hearts[this.value].isFull = false;
        }
    }

    render() {
        for (let i = 0; i < this.healthCount; i++) {
            this.hearts[i].render();
        }
    }
}

export default Health;
