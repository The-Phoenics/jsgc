import Cursor from "./Cursor.js";
import { C_WIDTH, C_HEIGHT, CANVAS_CONTEXT as ctx } from "./Globals.js";
import { clear_canvas } from "./Globals.js"

import Piece from "./Piece.js"

class Game {
    constructor() {
        this.GAME_START = true;
        this.GAME_OVER = false;

        this.cursor = new Cursor(100, 100)

        this.board = new Image();
        this.white_pawns = []
        this.black_pawns = []
        this.init()

        this.p = new Piece(3, 5)
    }

    init() {
        this.board.src = './img/board.png'
        for (let i = 0; i < 8; i++) {
            let pawn = new Piece(1, i, 'black', 'pawn');
            this.white_pawns.push(pawn) 
        }
        for (let i = 0; i < 8; i++) {
            let pawn = new Piece(6, i, 'white', 'pawn');
            this.white_pawns.push(pawn)
        }
    }

    update() {
        // update
    }

    render() {
        clear_canvas()
        // draw board
        ctx.drawImage(
            this.board,
            0,
            0,
            C_WIDTH,
            C_HEIGHT
        )
        // draw pieces
        // this.p.render()

        this.white_pawns.forEach(pawn => {
            pawn.render()
        })
        
        // draw cursor
        this.cursor.render()
    }

    draw() {
        
    }
}

export default Game;