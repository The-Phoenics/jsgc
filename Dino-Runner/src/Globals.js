export const CANVAS = document.querySelector('canvas');
export const CANVAS_CONTEXT = CANVAS.getContext('2d');

export const C_WIDTH = window.innerWidth
export const C_HEIGHT = window.innerHeight

export const DINO_POS_Y = C_HEIGHT - 200 + 75
export const FLOOR_POS_Y = C_HEIGHT - 135 + 75
export const DINO_JUMP_LIMIT = 200

// const hit_audio = new Audio('./img/hitball.wav')
// export function play_hit_audio() {
//     hit_audio.play()
// }

CANVAS.width = C_WIDTH;
CANVAS.height = C_HEIGHT;

export function clear_canvas() {
    CANVAS_CONTEXT.fillStyle = '#9a9a9a';
    CANVAS_CONTEXT.fillRect(0, 0, CANVAS.width, CANVAS.height);
}
