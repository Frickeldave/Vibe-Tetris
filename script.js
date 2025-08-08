/*
 * Vibe Tetris - minimal Tetris implementation in plain JavaScript.
 *
 * This file contains the entire game logic. It uses an HTML5 canvas
 * to draw the game board and shapes. Everything is contained in this
 * script so you can focus on understanding how the game works and
 * experiment with your own changes. Comments are sprinkled
 * throughout to explain each section in simple terms.
 *
 * To run the game, simply open index.html in your browser.
 */

// Dimensions of the game board: 10 columns wide, 20 rows tall.
const W = 10;
const H = 20;
const CELL_SIZE = 30; // each square in the grid is 30px

// Grab the canvas element and its 2D rendering context.
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');

// Define the shapes of the seven Tetris pieces (tetrominoes).
// Each piece is represented by a 2D array where 1 means a block
// and 0 means empty. Feel free to customize or add your own shapes!
const SHAPES = {
  I: [[1, 1, 1, 1]],
  O: [[1, 1], [1, 1]],
  T: [[0, 1, 0], [1, 1, 1]],
  L: [[1, 0, 0], [1, 1, 1]],
  J: [[0, 0, 1], [1, 1, 1]],
  S: [[0, 1, 1], [1, 1, 0]],
  Z: [[1, 1, 0], [0, 1, 1]],
};

// Assign a unique color for each piece. You can change these
// values to any valid CSS color (e.g. 'red', '#00FF00').
const COLORS = {
  I: '#5EF',
  O: '#FD5',
  T: '#C5F',
  L: '#FA6',
  J: '#6AF',
  S: '#6F8',
  Z: '#F66',
};

// Create the game board as a 20x10 grid filled with zeros.
// A zero means the cell is empty; otherwise it stores the
// letter of the tetromino occupying that position.
let board = Array.from({ length: H }, () => Array(W).fill(0));

// Variables to track the current falling piece and its position.
let currentPiece;
let pieceX = 3;
let pieceY = 0;
let dropCounter = 0;
let dropInterval = 48; // lower number makes pieces fall faster
let score = 0;
let gameOver = false;
let bag = [];

/**
 * Generate a new random bag containing exactly one of each
 * tetromino. This is called a “7-bag” randomizer and ensures
 * that you see every shape before repeats occur.
 */
function newBag() {
  bag = Object.keys(SHAPES).sort(() => Math.random() - 0.5);
}

/**
 * Spawn a new piece from the bag. If the bag is empty, refill
 * it first. Reset the piece position to the top of the board.
 */
function spawn() {
  if (bag.length === 0) {
    newBag();
  }
  const key = bag.pop();
  currentPiece = { key: key, matrix: SHAPES[key].map(row => row.slice()) };
  pieceX = 3;
  pieceY = 0;
  if (collides(pieceX, pieceY, currentPiece.matrix)) {
    gameOver = true;
  }
}

/**
 * Rotate a matrix (2D array) clockwise. The original matrix
 * is not modified; a new matrix is returned instead.
 */
function rotate(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const result = Array.from({ length: cols }, () => Array(rows).fill(0));
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      result[c][rows - 1 - r] = matrix[r][c];
    }
  }
  return result;
}

/**
 * Test whether placing the current piece at the given position
 * (nx, ny) would overlap an existing block or exceed the board
 * boundaries. Returns true if there is a collision.
 */
function collides(nx, ny, matrix) {
  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[r].length; c++) {
      if (!matrix[r][c]) continue;
      const x = nx + c;
      const y = ny + r;
      if (x < 0 || x >= W || y >= H) {
        return true;
      }
      if (y >= 0 && board[y][x]) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Merge the current piece into the board array. After calling
 * this function, the cells occupied by the piece become part
 * of the board and will remain when a new piece spawns.
 */
function merge() {
  for (let r = 0; r < currentPiece.matrix.length; r++) {
    for (let c = 0; c < currentPiece.matrix[r].length; c++) {
      if (currentPiece.matrix[r][c]) {
        board[pieceY + r][pieceX + c] = currentPiece.key;
      }
    }
  }
}

/**
 * Clear any full lines from the board and update the score.
 * Also speed up the drop interval as lines are cleared.
 */
function clearLines() {
  let linesCleared = 0;
  board = board.filter(row => row.some(cell => cell === 0));
  linesCleared = H - board.length;
  while (board.length < H) {
    board.unshift(Array(W).fill(0));
  }
  const points = [0, 100, 300, 500, 800];
  score += points[linesCleared] || 0;
  if (linesCleared > 0) {
    dropInterval = Math.max(16, dropInterval - 2);
  }
}

/**
 * Drop the current piece straight down until it hits something.
 */
function hardDrop() {
  while (!collides(pieceX, pieceY + 1, currentPiece.matrix)) {
    pieceY++;
  }
  step();
}

/**
 * Perform one step in the game loop: attempt to move the piece down
 * by one row. If a collision would occur, merge the piece and
 * spawn a new one instead.
 */
function step() {
  if (collides(pieceX, pieceY + 1, currentPiece.matrix)) {
    merge();
    clearLines();
    spawn();
  } else {
    pieceY++;
  }
}

/**
 * Draw everything to the screen: the existing blocks on the board,
 * the falling piece, and some text for the score and game over
 * state. The canvas is cleared at the start of each frame.
 */
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Draw the board
  for (let r = 0; r < H; r++) {
    for (let c = 0; c < W; c++) {
      if (board[r][c]) {
        ctx.fillStyle = COLORS[board[r][c]];
        ctx.fillRect(c * CELL_SIZE, r * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1);
      }
    }
  }
  // Draw the current piece
  ctx.fillStyle = COLORS[currentPiece.key];
  for (let r = 0; r < currentPiece.matrix.length; r++) {
    for (let c = 0; c < currentPiece.matrix[r].length; c++) {
      if (currentPiece.matrix[r][c]) {
        ctx.fillRect(
          (pieceX + c) * CELL_SIZE,
          (pieceY + r) * CELL_SIZE,
          CELL_SIZE - 1,
          CELL_SIZE - 1
        );
      }
    }
  }
  // Draw the score in the upper-left corner
  ctx.fillStyle = '#fff';
  ctx.font = '16px sans-serif';
  ctx.fillText(`Score: ${score}`, 8, 20);
  // Show a game over message if the game is over
  if (gameOver) {
    ctx.font = '24px sans-serif';
    ctx.fillText('GAME OVER', canvas.width / 2 - 80, canvas.height / 2);
    ctx.fillText('Press R to restart', canvas.width / 2 - 100, canvas.height / 2 + 30);
  }
}

/**
 * Main loop for the game. It uses requestAnimationFrame to schedule
 * the next frame. The dropCounter/interval logic makes pieces
 * fall every few frames instead of every frame.
 */
function loop() {
  if (!gameOver) {
    dropCounter++;
    if (dropCounter >= dropInterval) {
      dropCounter = 0;
      step();
    }
  }
  draw();
  requestAnimationFrame(loop);
}

/**
 * Reset the game state to start over. Called when the player
 * presses the 'R' key after a game over.
 */
function resetGame() {
  board = Array.from({ length: H }, () => Array(W).fill(0));
  dropInterval = 48;
  score = 0;
  gameOver = false;
  spawn();
}

/**
 * Keyboard event handler for moving, rotating and dropping pieces.
 * Arrow keys move and rotate the piece; space bar performs a hard drop.
 */
document.addEventListener('keydown', (event) => {
  // Prevent the page from scrolling when using arrow keys
  if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' '].includes(event.key)) {
    event.preventDefault();
  }
  if (gameOver) {
    if (event.key.toLowerCase() === 'r') {
      resetGame();
    }
    return;
  }
  switch (event.key) {
    case 'ArrowLeft':
      if (!collides(pieceX - 1, pieceY, currentPiece.matrix)) {
        pieceX--;
      }
      break;
    case 'ArrowRight':
      if (!collides(pieceX + 1, pieceY, currentPiece.matrix)) {
        pieceX++;
      }
      break;
    case 'ArrowDown':
      if (!collides(pieceX, pieceY + 1, currentPiece.matrix)) {
        pieceY++;
      }
      dropCounter = 0;
      break;
    case 'ArrowUp': {
      const rotated = rotate(currentPiece.matrix);
      // simple wall kicks: try rotate in place, then shift left or right
      if (!collides(pieceX, pieceY, rotated)) {
        currentPiece.matrix = rotated;
      } else if (!collides(pieceX - 1, pieceY, rotated)) {
        pieceX--;
        currentPiece.matrix = rotated;
      } else if (!collides(pieceX + 1, pieceY, rotated)) {
        pieceX++;
        currentPiece.matrix = rotated;
      }
      break;
    }
    case ' ':
      hardDrop();
      break;
  }
});

/**
 * Touch controls for mobile devices. These handlers interpret
 * swipe and tap gestures to move and rotate the piece.
 */
let touchStartX = null;
let touchStartY = null;
canvas.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
});
canvas.addEventListener('touchend', (e) => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  const dy = e.changedTouches[0].clientY - touchStartY;
  if (gameOver) {
    resetGame();
    return;
  }
  if (Math.abs(dx) > Math.abs(dy)) {
    if (dx > 0 && !collides(pieceX + 1, pieceY, currentPiece.matrix)) {
      pieceX++;
    } else if (dx < 0 && !collides(pieceX - 1, pieceY, currentPiece.matrix)) {
      pieceX--;
    }
  } else {
    if (dy > 20) {
      hardDrop();
    } else {
      const rotated = rotate(currentPiece.matrix);
      if (!collides(pieceX, pieceY, rotated)) {
        currentPiece.matrix = rotated;
      }
    }
  }
});

// Start the game
spawn();
loop();
