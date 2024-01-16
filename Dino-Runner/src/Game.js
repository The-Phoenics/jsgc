import { C_WIDTH, C_HEIGHT, CANVAS_CONTEXT as ctx, FLOOR_POS_Y } from "./Globals.js"
import { clear_canvas } from "./Globals.js"
import Dino from "./Dino.js";
import Movable from "./utils/Movable.js";
import Zombie from "./Zombie.js"
import Environment from "./Environment.js";
import ZombieManager from "./ZombieManager.js"

class Game {
    constructor() {
        this.zombieManager = new ZombieManager()
        this.init()
        setInterval(() => {
            this.zombieManager.zombies.forEach(element => {
                if (Math.abs(element.velX) < 6.0) {
                    element.increaseVelX(0.1);
                }
            })
            if (Math.abs(this.floor.velX) < 5.0) {
                this.floor.velX -= 0.1
            }
            //this.environment.increaseVelX(0.1);
        }, 10000)
    }

    update() {
        // update
        this.environment.update()
        this.dino.update(this.zombieManager.zombies)
        this.floor.update()
        this.zombieManager.update()
    }

    render() {
        clear_canvas()
        this.environment.render()
        this.floor.render()
        // this.zombie.render()
        this.zombieManager.render()
        this.dino.render()
    }

    init() {
        // environment (background parallax)
        this.environment = new Environment()
        // zombie
        this.zombie = new Zombie(700)
        // player
        this.dino = new Dino

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
                x:-1.6,
                y: 0
            }
        })
    }
}

export default Game
