// canvas constants
export const CANVAS = document.querySelector('canvas');
export const CANVAS_CONTEXT = CANVAS.getContext('2d');
export const C_WIDTH = window.innerWidth
export const C_HEIGHT = window.innerHeight

// set canvas dimensions
CANVAS.width = C_WIDTH;
CANVAS.height = C_HEIGHT;

// enable debug mode for logs and hitboxe rendering
export let DEBUG_MODE = false

// clear canvas before rendering
export function clear_canvas() {
    CANVAS_CONTEXT.fillStyle = 'white';
    CANVAS_CONTEXT.fillRect(0, 0, CANVAS.width, CANVAS.height);
}

// game constants
export const DINO_POS_Y = C_HEIGHT - 200 + 75
export const DINO_JUMP_LIMIT = 200
export const FLOOR_POS_Y = C_HEIGHT - 135 + 75
