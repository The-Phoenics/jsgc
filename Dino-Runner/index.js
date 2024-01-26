import Game from "./src/Game.js";

export let GAME_OVER = false;
export let GAME_START = false;

// game object
let game = new Game()

function game_loop() {
    window.requestAnimationFrame(game_loop)
    if (!GAME_OVER) {
        document.querySelector('#game-over').style.display = "none"
        game.update()
        game.render()
        // check game over
        GAME_OVER = game.dino.health.value <= 0;
    }
    else {
        // on game over
        document.querySelector('#game-over').style.display = "block"
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
        if (GAME_OVER) {
            game = new Game()
        }
        GAME_OVER = false
    }
    if (event.code === 'KeyP') {
        game.dino.isJumping = false
        game.dino.isDying = false
    }
    if (event.code === 'KeyD') {
        game.dino.isJumping = false
        game.dino.isDying = true
    }
})
