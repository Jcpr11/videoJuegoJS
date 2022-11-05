/* Selectores Body y Canvas */
const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

/* Selectores de los botones */
const btnUp = document.querySelector("#up");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");
const btnDown = document.querySelector("#down");

/* Selectores vidas y tiempo */
const spanLives = document.querySelector('#lives');
const spanTime = document.querySelector('#time');

/* Selectores records y tiempo partida total */
const spanRecord = document.querySelector('#record');
const pResult = document.querySelector('#result');

/* Variables globales */
let canvasSize;
let elementsSize;
let level = 0;
let lives = 3;
let timeStart;
let timePlayer;
let timeInterval;


/* variable de jugador */

const playerPosition = {
    x: undefined,
    y: undefined,
};

/* Colisiones */

const giftPosition = {
    x: undefined,
    y: undefined,
};

let enemyPositions = [];

/* add event listener canvas y resize pagina */
window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);

/* Add event listener de las teclas */
window.addEventListener("keydown", moveByKey);

/* add event listener de los botones */
btnUp.addEventListener("click", moveUp);
btnLeft.addEventListener("click", moveLeft);
btnRight.addEventListener("click", moveRight);
btnDown.addEventListener("click", moveDown);


/* Funciones inciales size etc */
function setCanvasSize() {
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.7;
    } else {
        canvasSize = window.innerHeight * 0.7;
    }

    canvasSize = Number(canvasSize.toFixed(0));

    canvas.setAttribute("width", canvasSize);
    canvas.setAttribute("height", canvasSize);

    elementsSize = canvasSize / 10;
    
    elementsSize = Number(elementsSize.toFixed(0));

    playerPosition.x = undefined;
    playerPosition.y = undefined;

    startGame();
}

function startGame() {
    console.log({canvasSize, elementsSize});
    console.log(playerPosition, giftPosition);

    game.font = elementsSize + "px sans-serif";
    game.textAlign = "end";

    const map = maps[level];

    if (!map) {
        gameWin();
        return;
    }

    if (!timeStart) {
        timeStart = Date.now();
        timeInterval = setInterval(showTime, 100);
        showRecord();
    }

    const mapRows = map.trim().split("\n");
    console.log(mapRows);
    const mapRowCols = mapRows.map(row => row.trim().split(""));
    console.log(mapRowCols);

    showLives();

    enemyPositions = [];
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
            } else if (col == 'I') {
                giftPosition.x = posX;
                giftPosition.y = posY;
            } else if (col == 'X') {
                enemyPositions.push({
                    x: posX,
                    y: posY
                });
            }

            game.fillText(emoji, posX, posY);
        })
    });

    movePlayer();
}

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

/* renderizado y movimiento y choques de la calaca */

function movePlayer() {

    /* Comprobacion si se colisiona con el regalo */

    const giftCollisionX = playerPosition.x.toFixed(2) == giftPosition.x.toFixed(2);
    const giftCollisionY = playerPosition.y.toFixed(2) == giftPosition.y.toFixed(2);
    const giftCollision = giftCollisionX && giftCollisionY;

    if (giftCollision) {
        levelWin();
    }

    /* comprobacion si se choca con una bomba */

    const enemyCollision = enemyPositions.find(enemy => {
        const enemyCollisionX = enemy.x.toFixed(2) == playerPosition.x.toFixed(2);
        const enemyCollisionY = enemy.y.toFixed(2) == playerPosition.y.toFixed(2);
        return enemyCollisionX && enemyCollisionY;
    });

    if (enemyCollision) {
        levelFail();
    }

    game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);
}

/* Juego ganado o nivel ganado o perdido*/

function levelWin() {
    console.log('Subiste de nivel');
    level++;
    startGame();
}

function gameWin() { // ejecuta la finalizacion del juego y pone los records
    console.log('Terminaste el juego !');
    clearInterval(timeInterval);

    const recordTime = localStorage.getItem('record_time');
    const playerTime = Date.now() - timeStart;

    if (recordTime) {
        if (recordTime >= playerTime) {
            localStorage.setItem('record_time', playerTime);
            pResult.innerHTML = 'Superaste el record! 🥳';
        } else {
            pResult.innerHTML = 'Lo siento no superaste el record 😒';
        }
    } else {
        localStorage.setItem('record_time', playerTime);
        pResult.innerHTML = 'Has logrado un nuevo record! 🤩';
    }

    console.log({recordTime, playerTime});
}

function levelFail() {
    console.log('Perdiste una vida');

    lives--;

    console.log(lives);

    if (lives <= 0) {
        level = 0;
        lives = 3;
        timeStart = undefined;
    }

    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
}

/* funciones para incluir los corazones y el tiempo y el record y el tiempo */

function showLives() {
    const heartsArray = Array(lives).fill(emojis['HEART']) // crea un array
    console.log(heartsArray);
    let heartsText = heartsArray.toString(); // pasamos el array a string
    console.log(heartsText);
    let heartsNoCommas = heartsText.replace(/,/g, ''); // quitamos todas las comas
    console.log(heartsNoCommas);

    spanLives.innerHTML = heartsNoCommas;
}

function showTime() {
    spanTime.innerHTML = Date.now() - timeStart;
}

function showRecord() {
    spanRecord.innerHTML = localStorage.getItem('record_time');
}


/* funciones de movimiento */

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