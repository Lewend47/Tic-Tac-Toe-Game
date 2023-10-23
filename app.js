let matrix = null;
let isXNext = true;
let isGameOver = false;
const soundCount = 4;
const winSound = document.getElementById("winSound");
const loseSound = document.getElementById("loseSound");
const drawSound = document.getElementById("drawSound");
let hasPlayedDrawSound = false;

function playRandomSound() {
    const randomSoundNumber = Math.floor(Math.random() * soundCount) + 1;
    const sound = document.getElementById(`sound${randomSoundNumber}`);
    sound.play();
}

let lastWinner = null;

function stopTheGame() {
    let BOARD = document.getElementById('tic_tac_toe');
    BOARD.innerHTML = '';
    BOARD.classList = '';
    document.getElementsByClassName('current_player')[0].innerHTML = '';
    document.getElementById('restart').style = 'block';
    document.getElementsByClassName('game_over')[0].style.display = 'block';
}

function playSound(soundElement) {
    soundElement.currentTime = 0;
    soundElement.play();
}

function drawStrikeLine(value) {
    const sanitizedValue = value.replace(/\s/g, '_');
    document.getElementById('tic_tac_toe').classList.add(sanitizedValue);
}

function checkMatchActive() {
    const isGameDone = checkMatchOver();
    if (isGameDone) {
        let game_over_el = document.getElementsByClassName('game_over')[0];
        game_over_el.innerHTML = isGameDone;
        isGameOver = true;
        playEndSound(isGameDone);
        drawStrikeLine(isGameDone);
        stopTheGame();
    } else if (matrix.flat().every(cell => cell) && !isGameOver) {
        let game_over_el = document.getElementsByClassName('game_over')[0];
        game_over_el.innerHTML = "It's a tie!";
        isGameOver = true;
        if (!hasPlayedDrawSound) {
            playSound(drawSound);
            hasPlayedDrawSound = true;
        }
        stopTheGame();
    }
}

function handleBoxClick(i, j) {
    checkMatchActive();
    if (!isGameOver) {
        let data = matrix;
        if (isXNext) {
            if (!data[i][j]) {
                data[i][j] = 'X';
                document.getElementsByClassName(`box_${i}_${j}`)[0].innerHTML = 'X';
                document.getElementsByClassName(`box_${i}_${j}`)[0].classList.add('x_class');
                isXNext = false;
                loadCurrentPlayer();
                playRandomSound();
                setTimeout(() => {
                    checkMatchActive();
                }, 100);
            }
        } else {
            if (!data[i][j]) {
                data[i][j] = 'O';
                document.getElementsByClassName(`box_${i}_${j}`)[0].innerHTML = 'O';
                document.getElementsByClassName(`box_${i}_${j}`)[0].classList.add('o_class');
                isXNext = true;
                loadCurrentPlayer();
                playRandomSound();
                setTimeout(() => {
                    checkMatchActive();
                }, 100);
            }
        }
    }
}

function loadTheGame() {
    matrix = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    isXNext = true;
    isGameOver = false;
    hasPlayedDrawSound = false;
    document.getElementById('restart').style.display = 'none';
    document.getElementById('restart').style.display = 'none';
    document.getElementsByClassName('game_over')[0].style.display = 'none';
    const TIC_TAC_TOE = document.getElementById('tic_tac_toe');
    for (let i = 0; i < matrix.length; i++) {
        let temp = matrix[i];
        let outerBox = document.createElement('div');
        outerBox.setAttribute('class', 'box-outer');
        for (let j = 0; j < temp.length; j++) {
            let box = document.createElement('div');
            box.innerHTML = temp[j];
            box.setAttribute('class', `box box_${i}_${j}`);
            box.addEventListener('click', () => {
                handleBoxClick(i, j);
            });
            outerBox.appendChild(box);
        }
        TIC_TAC_TOE.appendChild(outerBox);
    }
    loadCurrentPlayer();
}

function loadCurrentPlayer() {
    let el = document.getElementsByClassName('current_player')[0];
    el.innerHTML = isXNext ? 'X' : 'O';
}

function checkMatchOver() {
    for (let i = 0; i < matrix.length; i++) {
        if (matrix[i][0] && matrix[i][1] && matrix[i][2] && (matrix[i][0] === matrix[i][1] && matrix[i][1] === matrix[i][2])) {
            if (i === 0) {
                drawStrikeLine(`top_strike_${matrix[i][0]}`);
            }
            if (i === 1) {
                drawStrikeLine(`middle_strike_${matrix[i][0]}`);
            }
            if (i === 2) {
                drawStrikeLine(`bottom_strike_${matrix[i][0]}`);
            }
            return matrix[i][1] + ' won!';
        }
    }
    let arr0 = [];
    let arr1 = [];
    let arr2 = [];
    for (let i = 0; i < matrix.length; i++) {
        arr0.push(matrix[i][0]);
        arr1.push(matrix[i][1]);
        arr2.push(matrix[i][2]);
    }
    if (arr0.every(el => el === 'X') || arr0.every(el => el === 'O')) {
        drawStrikeLine(`left_vertical_strike_${arr0[0]}`);
        return arr0[0] + ' won!';
    }
    if (arr1.every(el => el === 'X') || arr1.every(el => el === 'O')) {
        drawStrikeLine(`middle_vertical_strike_${arr1[1]}`);
        return arr1[0] + ' won!';
    }
    if (arr2.every(el => el === 'X') || arr2.every(el => el === 'O')) {
        drawStrikeLine(`right_vertical_strike_${arr2[0]}`);
        return arr2[0] + ' won!';
    }

    let arrCrossX = [];
    for (let i = 0; i < matrix.length; i++) {
        arrCrossX.push(matrix[i][i]);
    }
    if (arrCrossX.every(el => el === 'X') || arrCrossX.every(el => el === 'O')) {
        drawStrikeLine(`x_cross_strike_${arrCrossX[0]}`);
        return arrCrossX[0] + ' won!';
    }

    let index = 2;
    let arrCrossY = [];
    for (let i = 0; i < matrix.length; i++) {
        arrCrossY.push(matrix[i][index]);
        --index;
    }
    if (arrCrossY.every(el => el === 'X') || arrCrossY.every(el => el === 'O')) {
        drawStrikeLine(`y_cross_strike_${arrCrossY[0]}`);
        return arrCrossY[0] + ' is the winner';
    }
}

function playEndSound(outcome) {
    if (outcome.includes('X') && lastWinner !== 'X') {
        setTimeout(() => {
            playSound(winSound);
        }, 500);
        lastWinner = 'X';
    } else if (outcome.includes('O') && lastWinner !== 'O') {
        setTimeout(() => {
            playSound(loseSound);
        }, 500);
        lastWinner = 'O';
    }
}
