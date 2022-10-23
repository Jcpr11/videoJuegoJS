const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

window.addEventListener("load", startGame);

function startGame() {
    //game.fillRect(0,0,100,100);
    //game.clearRect(50,50,50,50);
    game.fillText("Hola", 20, 20);
}