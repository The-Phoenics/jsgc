import Game from "./Game.js";
import { CANVAS_CONTEXT as ctx, CANVAS as canvas } from "./Globals.js";

let GAME_OVER = false;
let GAME_START = false;

// ----------------------------------------- //

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

game_loop()
