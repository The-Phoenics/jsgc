import Entity from './Entity.js'
import Animator from './Animator.js';

export const PLAYER_VEL_MAG = 1; // player velocity magnitude
const PLAYER_JUMP_MAG = 8; // player jump magnitude
const JUMP_LIMIT = 140;

class Player extends Entity {
    constructor() {
        super({
            position: { x: 400, y: 400 },
            dimension: { x: 50, y: 150 },
            velocity: { x: 0, y: 0 },
            color: 'blue'
        })

        this.animator = new Animator({
            imageSrc: './img/player/Idle.png',
            position: {
                x: this.x,
                y: this.y
            },
            dimension: {
                w: this.w + 45,
                h: this.h
            },
            spritesheet: {
                row: 1,
                column: 10
            }
        }, 5, 4);

        this.animator.cropX = 65;
        this.animator.cropY = 55;
        this.playerState = 'IDLE';
    }

    update() {
        super.update();
        if (this.playerState === 'IDLE') {
            this.image.imageSrc = './img/player/Idle.png'
            this.animator.update();
        }
        this.animator.setPosition({
            position: {
                x: this.x,
                y: this.y
            }
        })
    }

    render() {
        //super.render();
        this.healthBar.render();
        this.animator.render();
    }
}

export default Player;