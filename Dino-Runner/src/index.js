import Game from "./Game.js";
import { DINO_JUMP_LIMIT } from "./Globals.js";

// game entry point

let GAME_OVER = false;
let GAME_START = false;

const game = new Game()

function game_loop() {
    window.requestAnimationFrame(game_loop)
    if (!GAME_OVER) {
        game.update()
        game.render()
    }
    else {
        // on game over
    }
}

function main() {
    game_loop()
}

main()

// events
document.addEventListener('keyup', event => {
    if (event.code === 'Space' && !game.dino.isJumping) {
        game.dino.isJumping = true
        game.dino.isDying = false
        console.log('Enter Jump state')
    }
    if (event.code === 'KeyP') {
        game.dino.isJumping = false
        game.dino.isDying = false
    }
    if (event.code === 'KeyD') {
        game.dino.isJumping = false
        game.dino.isDying = true
        console.log('Die state')
    }
})