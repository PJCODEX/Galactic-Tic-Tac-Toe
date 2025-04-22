const board = document.getElementById('board');
const statusText = document.getElementById('status');
let squares = Array(9).fill(null);
let currentPlayer = 'X';
let gameActive = true;

function createBoard() {
  board.innerHTML = '';
  squares.forEach((val, index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = index;
    cell.textContent = val || '';
    cell.addEventListener('click', handleMove);
    board.appendChild(cell);
  });
}

function handleMove(e) {
  const idx = e.target.dataset.index;
  if (squares[idx] || !gameActive) return;

  squares[idx] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    statusText.textContent = `🎉 ${getPlayerName()} wins! Peace secured!`;
    gameActive = false;
    return;
  }

  if (squares.every(val => val)) {
    statusText.textContent = "It's a draw! The universe remains at a stalemate.";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `${getPlayerName()}, it's your turn!`;
}

function checkWinner() {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return wins.some(([a,b,c]) => squares[a] && squares[a] === squares[b] && squares[b] === squares[c]);
}

function getPlayerName() {
  return currentPlayer === 'X' ? 'Galactic Alliance (X)' : 'Cosmic Federation (O)';
}

function resetBoard() {
  squares = Array(9).fill(null);
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = `${getPlayerName()}, it's your turn!`;
  createBoard();
}

createBoard();
