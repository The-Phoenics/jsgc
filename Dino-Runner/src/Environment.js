import Parallax from "./utils/Parallax.js";
import Drawable from "./utils/Drawable.js";
import { C_WIDTH, C_HEIGHT } from "./Globals.js";

class Environment {
    constructor() {
        // velocity factor for all background objects
        this.velX = 0
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
                x:-0.05 + this.velX,
                y: 0
            }
        })
        this.mountain = new Parallax({
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
                x:-0.1 + this.velX,
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
                x:-0.2 + this.velX,
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
                x:-0.4 + this.velX,
                y: 0
            }
        })
    }

    increaseVelX(value = 0) {
        this.mountTrees.setVelocity (velocity = { x: this.mountTrees.x  - value, y: this.mountTrees.y  })
        this.foreTrees.setVelocity  (velocity = { x: this.foreTrees.x   - value, y: this.foreTrees.y   })
        this.mountain.setVelocity   (velocity = { x: this.mountain.x    - value, y: this.mountain.y    })
        this.bigMountain.setVelocity(velocity = { x: this.bigMountain.x - value, y: this.bigMountain.y })
    }

    update() {
        this.bigMountain.update()
        this.mountain.update()
        this.mountTrees.update()
        this.foreTrees.update()
    }

    render() {
        this.backg.render()
        this.bigMountain.render()
        this.mountain.render()
        this.mountTrees.render()
        this.foreTrees.render()
    }
}

export default Environment;
