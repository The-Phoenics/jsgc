import { C_WIDTH, C_HEIGHT, CANVAS_CONTEXT as ctx, FLOOR_POS_Y } from "./Globals.js"
import { clear_canvas } from "./Globals.js"
import Dino from "./Dino.js";
import Drawable from "./utils/Drawable.js";
import Movable from "./utils/Movable.js";
import Zombie from "./Zombie.js"
import Parallax from "./utils/Parallax.js";

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
            imgSrc: './img/sun_background.png',
            position: {
                x: 0,
                y: 0
            },
            dimension: {
                w: C_WIDTH,
                h: C_HEIGHT
            }
        })
        this.bigMountain = new Parallax({
            imgSrc: './img/big_mountain.png',
            position: {
                x: 0,
                y: 0
            },
            dimension: {
                w: C_WIDTH,
                h: C_HEIGHT
            },
            velocity: {
                x:-0.05,
                y: 0
            }
        })
        this.mountian = new Parallax({
            imgSrc: './img/mountains.png',
            position: {
                x: 0,
                y: 0
            },
            dimension: {
                w: C_WIDTH,
                h: C_HEIGHT
            },
            velocity: {
                x:-0.1,
                y: 0
            }
        })
        this.mountTrees = new Parallax({
            imgSrc: './img/mount_trees.png',
            position: {
                x: 0,
                y: 0
            },
            dimension: {
                w: C_WIDTH,
                h: C_HEIGHT
            },
            velocity: {
                x:-0.2,
                y: 0
            }
        })
        this.foreTrees = new Parallax({
            imgSrc: './img/foreTrees.png',
            position: {
                x: 0,
                y: 0
            },
            dimension: {
                w: C_WIDTH,
                h: C_HEIGHT
            },
            velocity: {
                x:-0.4,
                y: 0
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
        this.mountian.update()
        this.mountTrees.update()
        this.bigMountain.update()
        this.floor.update()
        this.foreTrees.update()
        this.dino.update()
        this.zombie.update()
    }

    render() {
        clear_canvas()
        this.backg.render()
        this.bigMountain.render()
        this.mountian.render()
        this.mountTrees.render()
        this.foreTrees.render()
        this.floor.render()
        this.zombie.render()
        this.dino.render()
    }
}

export default Game