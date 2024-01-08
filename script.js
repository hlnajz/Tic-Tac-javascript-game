document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("board");
  const result = document.getElementById("result");
  let currentPlayer = "X";
  let gameBoard = ["", "", "", "", "", "", "", "", ""];

  // Create cells dynamically
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.dataset.index = i;
    cell.addEventListener("click", handleCellClick);
    board.appendChild(cell);
  }

  function handleCellClick(event) {
    const index = event.target.dataset.index;

    if (gameBoard[index] === "" && !result.textContent) {
      gameBoard[index] = currentPlayer;
      event.target.textContent = currentPlayer;
      checkWinner();
      switchPlayer();
    }
  }

  function checkWinner() {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        gameBoard[a] &&
        gameBoard[a] === gameBoard[b] &&
        gameBoard[a] === gameBoard[c]
      ) {
        result.textContent = `${currentPlayer} wins!`;
        highlightWinnerCells(pattern);
        return;
      }
    }

    if (!gameBoard.includes("")) {
      result.textContent = "It's a tie!";
    }
  }

  function switchPlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }

  function resetGame() {
    currentPlayer = "X";
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    result.textContent = "";
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.textContent = "";
      cell.style.backgroundColor = "";
    });
  }

  function highlightWinnerCells(pattern) {
    pattern.forEach((index) => {
      const cell = document.querySelector(`.cell[data-index="${index}"]`);
      cell.style.backgroundColor = "#4caf50";
    });
  }
});
