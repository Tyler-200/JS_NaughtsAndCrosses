/** naughts and crosses JavaScript
 *  Author: Tyler Hughes
 * 
 */

const statusDisplay = document.querySelector('.status');

let active = false;
let currentPlayer = "X";
let gameState = ["","","","","","","","",""];
let mode = "";
const winningConditions = [ [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], 
                            [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

// message storage to keep code clean
const winnerMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerMessage = () => `It's ${currentPlayer}'s turn`;

// event listners for in app buttons
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', clickHandler));
document.querySelector('.restartBtn').addEventListener('click', restartGame);
document.getElementById('friendBtn').addEventListener('click', () => selectMode('friend'));
document.getElementById('computerBtn').addEventListener('click', () => selectMode('computer'));

statusDisplay.innerHTML = currentPlayerMessage();

/** Sets the mode that the player has selected to the inputed string
 * 
 * @param {string} selectedMode - the game mode selected 'computer'/'friend' 
 */
function selectMode(selectedMode){
    mode = selectedMode;
    active = true;
    document.querySelector('.mode').style.display = "none";
}

/** Allows the user to select a cell to input either an "X" or an "O"
 * 
 * @param  clickedCellEvent - the targeted cell that has been clicked
 */
function clickHandler(clickedCellEvent){
    const selectedCell = clickedCellEvent.target;
    const cellIndex = parseInt(selectedCell.getAttribute('data-index'));
    // will only run if game is active 
    if (gameState[cellIndex] !== "" || !active){
        return;
    }

    cellPlayed(selectedCell, cellIndex);
    handleRes(); 

    if(mode === 'computer' && active){
        setTimeout(cpuMove, 500);
    }
}

// the logic for the computers moves, only randomly selects based on free cells
function cpuMove(){
    const availableCells = gameState.map((val, index) => val === "" ? index : null).filter(val => val !== null);
    const randomIndex = Math.floor(Math.random() * availableCells.length);
    const cellIndex = availableCells[randomIndex];

    if (cellIndex !== undefined) {
        const selectedCell = document.querySelector(`.cell[data-index='${cellIndex}']`);
        cellPlayed(selectedCell, cellIndex);
        handleRes();
    }
}

/** Adds the current players symbol to a selected cell
 * 
 * @param {*} cell - the selected item in the DOM
 * @param {Number} index - the number of the cell selected 0-8
 */
function cellPlayed(cell, index){
    gameState[index] = currentPlayer;
    cell.innerHTML = currentPlayer;
}

// chekcs if the move taken is a winning move or a draw, does nothing if neither condition is met
function handleRes(){
    let won = false;
    for (let i=0; i<=7; i++){
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === ''){
            continue;
        }
        if (a === b && b === c){
            won = true;
            break
        }
    }
    if (won){
        statusDisplay.innerHTML = winnerMessage();
        active = false;
        return;
    }
    if (!gameState.includes("")){
        statusDisplay.innerHTML = drawMessage();
        active = false;
        return;
    }
    changePlayer();
}

// swaps player and redisplays player message
function changePlayer(){
    if(currentPlayer == "X"){
        currentPlayer = "O"
    } else {
        currentPlayer = "X"
    }
    statusDisplay.innerHTML = currentPlayerMessage();
}

// refreshes the game to the initial state
function restartGame(){
    active = false;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerMessage();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
    document.querySelector('.mode').style.display = "block";
}