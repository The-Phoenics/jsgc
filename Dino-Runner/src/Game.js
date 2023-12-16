import { C_WIDTH, C_HEIGHT, CANVAS_CONTEXT as ctx, FLOOR_POS_Y } from "./Globals.js"
import { clear_canvas } from "./Globals.js"
import Dino from "./Dino.js";
import Drawable from "./utils/Drawable.js";
import Movable from "./utils/Movable.js";
import Zombie from "./Zombie.js"

class Game {
    constructor() {
        this.GAME_START = true;
        this.GAME_OVER = false;
        
        // zombie
        this.zombie = new Zombie()
        // player
        this.dino = new Dino
        // background
        this.backg = new Drawable({
            imgSrc: './img/ocean.png',
            position: {
                x: 0,
                y: 0
            },
            dimension: {
                w: C_WIDTH,
                h: C_HEIGHT
            }
        })
        // floor
        this.floor = new Movable({
            imgSrc: './img/floor.png',
            position: {
                x: -10,
                y: FLOOR_POS_Y
            },
            dimension: {
                w: C_WIDTH * 2,
                h: 32 * 2
            },
            velocity: {
                x:-1,
                y: 0
            }
        })
    }

    update() {
        // update
        this.floor.update()
        // to keep floor within canvas
        if (this.floor.x + this.floor.w < C_WIDTH) {
            this.floor.x = 5
        }
        this.dino.update()
        this.zombie.update()
    }

    render() {
        clear_canvas()
        this.backg.render()
        this.floor.render()
        this.zombie.render()
        this.dino.render()
    }
}

export default Game