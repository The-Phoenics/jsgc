export const CANVAS = document.querySelector('canvas');
export const CANVAS_CONTEXT = CANVAS.getContext('2d');

export const C_WIDTH  = 700
export const C_HEIGHT = 700

CANVAS.width = C_WIDTH;
CANVAS.height = C_HEIGHT;

export function clear_canvas() {
    CANVAS_CONTEXT.fillStyle = 'black';
    CANVAS_CONTEXT.fillRect(0, 0, CANVAS.width, CANVAS.height);
}