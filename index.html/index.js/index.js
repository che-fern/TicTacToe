const cells = document.querySelectorAll('.cell');
const X = 'x'; 
const O = 'o'; 
let currentPlayer = X;
let gameBoard = Array(9).fill(null);

cells.forEach((cell, index) => {
  cell.addEventListener('click', () => handleClick(cell, index));
});

function handleClick(cell, index) {
  // Ignore click if cell is already filled
  if (gameBoard[index] !== null) return;

  // Mark the cell with the current player's symbol
  gameBoard[index] = currentPlayer;
  cell.classList.add(currentPlayer);
  cell.textContent = currentPlayer.toUpperCase();

  // Check for a win or draw
  if (checkWin()) {
    setTimeout(() => alert(currentPlayer.toUpperCase() + ' wins!'), 10);
    resetGame();
  } else if (gameBoard.every(cell => cell)) {
    setTimeout(() => alert("It's a draw!"), 10);
    resetGame();
  } else {
    // Switch players
    currentPlayer = currentPlayer === X ? O : X;
  }
}

function checkWin() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // columns
    [0, 4, 8], [2, 4, 6]              // diagonals
  ];
  return winningCombinations.some(combination =>
    combination.every(index => gameBoard[index] === currentPlayer)
  );
}

function resetGame() {
  gameBoard.fill(null);
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove(X, O);
  });
  currentPlayer = X;
}