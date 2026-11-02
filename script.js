import { Game } from "./game.js";

const body = document.body;
body.addEventListener("click", function(event) {
    const game = new Game("myCanvas");
    const rect = game.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    game.addParticle(x, y);
});