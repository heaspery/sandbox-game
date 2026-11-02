import { CELL_SIZE } from "./constants.js";

export class Particle {
    constructor(x, y, type, color) {
        // Snap to the grid so the particle always sits inside a cell
        this.x = Math.floor(x / CELL_SIZE) * CELL_SIZE;
        this.y = Math.floor(y / CELL_SIZE) * CELL_SIZE;
        this.type = type;
        this.color = color;
        this.velocityY = 0;
    }

    // Move down one cell unless the particle has reached the bottom
    update(maxY) {
        if (this.y < maxY - CELL_SIZE) {
            this.y += CELL_SIZE;
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, CELL_SIZE, CELL_SIZE);
    }
}