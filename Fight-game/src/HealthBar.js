import { ctx } from "./index.js";

class HealthBar {
    constructor({ position, dimension }, healthValue = 100) {
        this.x = position.x;
        this.y = position.y;
        this.w = dimension.w;
        this.h = dimension.h;
        this.bgcolor = 'white';
        this.healthColor = 'green';
        this.health = healthValue;
        this.offset = {
            x: 0,
            y: 20
        };
    }

    update({ position }, healthValue) {
        this.x = position.x - this.offset.x;
        this.y = position.y - this.offset.y;
        this.health = healthValue
    }

    render() {
        ctx.fillStyle = this.bgcolor;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        this.renderHealth();
    }

    renderHealth() {
        ctx.fillStyle = this.healthColor;
        let score_percent = (this.health / 100) * this.w;
        ctx.fillRect(this.x, this.y, this.health, this.h);
    }
}

export default HealthBar;