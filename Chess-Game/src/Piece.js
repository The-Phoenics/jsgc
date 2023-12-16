import { C_WIDTH, C_HEIGHT, CANVAS_CONTEXT as ctx } from "./Globals.js";

const OFFSET_X = 10
const OFFSET_Y = 15

const PAWN_WIDTH  = C_WIDTH  / 8
const PAWN_HEIGHT = C_HEIGHT / 8

class Piece {
    constructor(row, col, colour = 'black', pieceName = 'pawn' ) {
        this.row = row
        this.col = col
        this.image = new Image()
        this.name = pieceName
        this.colour = colour
        this.imageSrc = colour + "_" + pieceName + '.png'
        this.init()
    }

    init() {
        this.image.src = './img/' + this.imageSrc
    }

    update() {

    }

    render() {
        ctx.drawImage(
            this.image,
            this.col + PAWN_HEIGHT * this.col, // x axis columns
            this.row + PAWN_WIDTH * this.row, // y axis rows
            PAWN_WIDTH - OFFSET_X / 2,
            PAWN_HEIGHT - OFFSET_Y
        )
    }

    canMove() {
        // pure virtual method
    }
}

export default Piece