import Entity from "./Entity.js";
import { C_WIDTH, CANVAS_CONTEXT as ctx } from "./Globals.js";

export let ROW = 5
export let COL = 10
export const TOTAL_BRICKS = ROW * COL

export let MARGIN = 10
export let brickWidth = (C_WIDTH - MARGIN * (COL + 1)) / COL
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
        })
    }
}

export default Brick;