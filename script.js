// script.js

document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const board = document.getElementById('board');
    const restartButton = document.getElementById('restartButton');
    const message = document.getElementById('message');
    
    let currentPlayer = 'X';
    let gameActive = true;
    let boardState = Array(9).fill(null);
    
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
    
    restartButton.addEventListener('click', restartGame);
    
    function handleCellClick(event) {
        const cell = event.target;
        const cellIndex = cell.getAttribute('data-index');
        
        if (boardState[cellIndex] !== null || !gameActive) return;
        
        updateCell(cell, cellIndex);
        checkWinner();
    }
    
    function updateCell(cell, index) {
        boardState[index] = currentPlayer;
        cell.textContent = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
    
    function checkWinner() {
        let roundWon = false;
        
        for (let i = 0; i < winningCombinations.length; i++) {
            const [a, b, c] = winningCombinations[i];
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                roundWon = true;
                break;
            }
        }
        
        if (roundWon) {
            message.textContent = `Player ${currentPlayer === 'X' ? 'O' : 'X'} wins!`;
            gameActive = false;
            return;
        }
        
        if (!boardState.includes(null)) {
            message.textContent = 'It\'s a tie!';
            gameActive = false;
            return;
        }
    }
    
    function restartGame() {
        boardState.fill(null);
        cells.forEach(cell => cell.textContent = '');
        gameActive = true;
        currentPlayer = 'X';
        message.textContent = '';
    }
});
