import { CELL_SIZE, GRID_COLOR, SAND_COLOR } from "./constants.js";
import { Particle } from "./particle.js";

export class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.particles = [];

        // Size the canvas to the window, rounded down to a multiple of CELL_SIZE
        this.width = window.innerWidth - (window.innerWidth % CELL_SIZE);
        this.height = window.innerHeight - (window.innerHeight % CELL_SIZE);
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        this.canvas.addEventListener("click", (event) => {
            const rect = this.canvas.getBoundingClientRect();
            this.addParticle(event.clientX - rect.left, event.clientY - rect.top);
        });
    }

    addParticle(x, y) {
        this.particles.push(new Particle(x, y, "sand", SAND_COLOR));
    }

    update() {
        for (const particle of this.particles) {
            particle.update(this.height);
        }
    }

    drawGrid() {
        this.ctx.strokeStyle = GRID_COLOR;
        this.ctx.lineWidth = 1;
        for (let y = 0; y < this.height; y += CELL_SIZE) {
            for (let x = 0; x < this.width; x += CELL_SIZE) {
                this.ctx.strokeRect(x, y, CELL_SIZE, CELL_SIZE);
            }
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.drawGrid();
        for (const particle of this.particles) {
            particle.draw(this.ctx);
        }
    }

    start() {
        const loop = () => {
            this.update();
            this.draw();
            requestAnimationFrame(loop);
        };
        loop();
    }
}