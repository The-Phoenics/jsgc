import Parallax from "./utils/Parallax.js";
import Drawable from "./utils/Drawable.js";
import { C_WIDTH, C_HEIGHT } from "./Globals.js";

class Environment {
    constructor() {
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