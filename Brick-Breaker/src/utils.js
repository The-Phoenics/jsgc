// aabb collision detection
export function aabb({ rect1, rect2 }) {
    return (
        rect1.x < rect2.x + rect2.w &&
        rect1.x + rect1.w > rect2.x &&
        rect1.y < rect2.y + rect2.h &&
        rect1.y + rect1.h > rect2.y
    );
}

class Vec2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    addInto(otherVec2) {
        this.x += otherVec2.x;
        this.y += otherVec2.y;
    }
}

// export default Vec2;
