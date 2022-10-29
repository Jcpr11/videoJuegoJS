const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

let canvasSize;
let elementsSize;

/* variable de jugador */

const playerPosition = {
    x: undefined,
    y: undefined,
}


/* add event listener canvas y resize pagina */

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);

/* Funciones inciales size etc */

function setCanvasSize() {
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8;
    } else {
        canvasSize = window.innerHeight * 0.8;
    }

    canvas.setAttribute("width", canvasSize);
    canvas.setAttribute("height", canvasSize);

    elementsSize = canvasSize / 10;

    startGame();
}

function startGame() {
    console.log({canvasSize, elementsSize});

    game.font = elementsSize + "px sans-serif";
    game.textAlign = "end";

    const map = maps[0];
    const mapRows = map.trim().split("\n");
    console.log(mapRows);
    const mapRowCols = mapRows.map(row => row.trim().split(""));
    console.log(mapRowCols);

    game.clearRect(0, 0, canvasSize, canvasSize);

    mapRowCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const emoji = emojis[col];
            const posX = elementsSize * (colI + 1);
            const posY = elementsSize * (rowI + 1);

            if (col == 'O') {
                if (!playerPosition.x && !playerPosition.y) {
                    playerPosition.x = posX;
                    playerPosition.y = posY;
                    console.log({playerPosition});
                }
            }

            game.fillText(emoji, posX, posY);
        })
    });

    movePlayer();
}

/* Variables de los botones */

const btnUp = document.querySelector("#up");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");
const btnDown = document.querySelector("#down");

/* Add event listener de las teclas */

window.addEventListener("keydown", moveByKey);

/* add event listener de los botones */
btnUp.addEventListener("click", moveUp);
btnLeft.addEventListener("click", moveLeft);
btnRight.addEventListener("click", moveRight);
btnDown.addEventListener("click", moveDown);

/* funciones de movimiento */

function moveByKey(event) {
    console.log(event);
    switch (event.key) {
        case 'ArrowUp':
            moveUp();
            break;
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowRight':
            moveRight();
            break;
        case 'ArrowDown':
            moveDown();
            break;
    }
}

/* renderizado y movimiento de la calaca */

function movePlayer() {
    game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);
}

function moveUp() {
    console.log("Me quiero mover hacia arriba");

    if ((playerPosition.y - elementsSize) < elementsSize) {
        console.log("Out");
    } else {
        playerPosition.y -= elementsSize;
        startGame();
    }    
}

function moveLeft() {
    console.log("Me quiero mover hacia la izquierda");

    if ((playerPosition.x - elementsSize) < elementsSize) {
        console.log("Out");
    } else {
        playerPosition.x -= elementsSize;
        startGame();
    }
}

function moveRight() {
    console.log("Me quiero mover hacia arriba la derecha");

    if ((playerPosition.x + elementsSize) > canvasSize) {
        console.log("Out");
    } else {
        playerPosition.x += elementsSize;
        startGame();
    }
}

function moveDown() {
    console.log("Me quiero mover hacia abajo");

    if ((playerPosition.y + elementsSize) > canvasSize) {
        console.log("Out");
    } else {
        playerPosition.y += elementsSize;
        startGame();
    }
}