/** naughts and crosses JavaScript
 *  Author: Tyler Hughes
 */

const statusMesage = document.querySelector('.status');

let active = true;
let currentPlayer = "X";
let gameState = ["","","","","","","","",""];
const winningConditions = [ [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], 
                            [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];


document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);