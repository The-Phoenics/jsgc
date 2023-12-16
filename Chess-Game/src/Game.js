import Cursor from "./Cursor.js"
import { C_WIDTH, C_HEIGHT, CANVAS_CONTEXT as ctx } from "./Globals.js"
import { clear_canvas } from "./Globals.js"
import Piece from "./Piece.js"

const isUpperCase = (string) => /^[A-Z]*$/.test(string)

class Game {
    constructor() {
        this.GAME_START = true;
        this.GAME_OVER = false;
        this.cursor = new Cursor(100, 100)
        this.board = 'rhbqkbhr/pppppppp/eeeeeeee/eeeeeeee/eeeeeeee/eeeeeeee/PPPPPPPP/RHBQKBHR'
        this.boardImg = new Image();
        this.white_pawns = []
        this.black_pawns = []
        this.init()
        this.piece = new Piece(3, 5)
    }

    init() {
        this.boardImg.src = './img/board.png'
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
            this.boardImg,
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

    drawBoard() {
        for (let i = 0; i < this.board.length(); i++) {
            let row = 0
            let col = 0
            
            
            
        }
    }

    // uppercase are white pieces
    isWhite(board_char_index) {
        let char = this.board.charAt(board_char_index)
        if (isUpperCase(char)) {
            console.log(`Upper case: ${char}`)
            return true
        }
    }
}

export default Game;