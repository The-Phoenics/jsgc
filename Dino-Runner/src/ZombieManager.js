import Zombie from "./Zombie.js";
import { C_WIDTH } from "./Globals.js";
import { randomRange } from "./utils/Collision.js"

class ZombieManager {
    constructor() {
        this.count = 5 
        this.zombies = []
        this.init()
    }

    init() {
        this.initialX = randomRange(1200, 2500);
        for (let i = 0; i < this.count; i++) {
            let pos = 0
            if (i == 0)
                pos = this.initialX
            else
                pos = this.zombies[i - 1].x + randomRange(300, 800) 
            let zombie = new Zombie(pos)
            this.initialX = pos
            this.zombies.push(zombie)
        }
    }

    update() {
        for (let i = 0; i < this.count; i++) {
            this.zombies[i].update()
        }
    }

    render() {
        for (let i = 0; i < this.count; i++) {
            this.zombies[i].render()
        }
    }

}

export default ZombieManager;
