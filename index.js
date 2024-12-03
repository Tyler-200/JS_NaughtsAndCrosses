/** naughts and crosses JavaScript
 *  Author: Tyler Hughes
 */

const statusDisplay = document.querySelector('.status');

let active = true;
let currentPlayer = "X";
let gameState = ["","","","","","","","",""];
const winningConditions = [ [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], 
                            [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

const winnerMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerMessage = () => `It's ${currentPlayer}'s turn`;

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', clickHandler));
document.querySelector('.restartBtn').addEventListener('click', restartGame);

statusDisplay.innerHTML = currentPlayerMessage();

function clickHandler(clickedCellEvent){
    const selectedCell = clickedCellEvent.target;
    const cellIndex = parseInt(selectedCell.getAttribute('data-index'));

    if (gameState[cellIndex] !== "" || !active){
        return;
    }

    cellPlayed(selectedCell, cellIndex);
    handleRes(); 
}

function cellPlayed(cell, index){
    gameState[index] = currentPlayer;
    cell.innerHTML = currentPlayer;
}

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

function changePlayer(){
    if(currentPlayer == "X"){
        currentPlayer = "O"
    } else {
        currentPlayer = "X"
    }
    statusDisplay.innerHTML = currentPlayerMessage();
}

function restartGame(){
    active = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerMessage();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}