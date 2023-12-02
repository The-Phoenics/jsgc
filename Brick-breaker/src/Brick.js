import Entity from "./Entity.js";
import { C_WIDTH, CANVAS_CONTEXT as ctx } from "./Globals.js";

export let ROW = 8
export let COL = 10
export const TOTAL_BRICKS = ROW * COL

export const HORIZONTAL_BRICK_MARGIN = 10
export const VERTICAL_BRICK_MARGIN = 37

export let brickWidth = (C_WIDTH - HORIZONTAL_BRICK_MARGIN * (COL + 1)) / COL
export let brickHeight = 15

class Brick extends Entity {
    constructor(_x, _y) {
        super({
            position: {
                x: _x,
                y: _y
            },
            dimension: {
                w: brickWidth,
                h: brickHeight
            },
            velocity: {
                x: 0,
                y: 0
            },
            color: 'green'
        }, './img/yellowbrick1.png');
        
        this.isAlive = true;
        this.health = 3;
    }

    switchBrickImage() {
        if (this.health <= 0) {
            this.isAlive = false
        }
        if (this.health == 3) {
            this.image.src = './img/yellowbrick1.png';
        } else if (this.health == 2) {
            this.image.src = './img/yellowbrick2.png';
        } else if (this.health == 1) {
            this.image.src = './img/yellowbrick3.png';
        }
    }
}

export default Brick;