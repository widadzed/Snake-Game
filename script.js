const gameBoard = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');

const gridSize = 20; // Size of each grid cell in pixels
let snake = [{ x: 10, y: 10 }]; // Initial snake position
let food = { x: 5, y: 5 }; // Initial food position
let direction = { x: 0, y: 0 }; // Initial direction
let score = 0; // Initial score

// Function to draw the game board, snake, and food
function drawGameBoard() {
  
  gameBoard.innerHTML = '';

  // Draw snake
  for (let i = 0; i < snake.length; i++) {
    const snakeSegment = document.createElement('div');
    snakeSegment.style.left = snake[i].x * gridSize + 'px';
    snakeSegment.style.top = snake[i].y * gridSize + 'px';
    snakeSegment.classList.add('snake');
    gameBoard.appendChild(snakeSegment);
  }

  // Draw food
  const foodElement = document.createElement('div');
  foodElement.style.left = food.x * gridSize + 'px';
  foodElement.style.top = food.y * gridSize + 'px';
  foodElement.classList.add('food');
  gameBoard.appendChild(foodElement);
}

//update the snake's position and check collisions
function updateGameState() {
  // Calculate new head position based on the current direction
  let head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  
  if (head.x < 0) {
    head.x = Math.floor(gameBoard.clientWidth / gridSize) - 1;
  } else if (head.x >= gameBoard.clientWidth / gridSize) {
    head.x = 0;
  }

  if (head.y < 0) {
    head.y = Math.floor(gameBoard.clientHeight / gridSize) - 1; 
  } else if (head.y >= gameBoard.clientHeight / gridSize) {
    head.y = 0; 
  }

  // Check if the snake eats the food
  if (head.x === food.x && head.y === food.y) {
    score += 10; // Increase score
    scoreDisplay.textContent = 'Score: ' + score;
    generateFood(); 
  } else {
    snake.pop();
  }

  // Check for self-collision
  for (let i = 0; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      alert('Game Over!');
      resetGame();
      return;
    }
  }

  
  snake.unshift(head);
}


function generateFood() {
  food = {
    x: Math.floor(Math.random() * gameBoard.clientWidth / gridSize),
    y: Math.floor(Math.random() * gameBoard.clientHeight / gridSize)
  };
}

//handle key presses for snake direction
function changeDirection(event) {
  if (event.key === 'ArrowUp' && direction.y === 0) {
    direction = { x: 0, y: -1 };
  } else if (event.key === 'ArrowDown' && direction.y === 0) {
    direction = { x: 0, y: 1 };
  } else if (event.key === 'ArrowLeft' && direction.x === 0) {
    direction = { x: -1, y: 0 };
  } else if (event.key === 'ArrowRight' && direction.x === 0) {
    direction = { x: 1, y: 0 };
  }
}

//loop to keep updating the game state and rendering
function gameLoop() {
  setTimeout(() => {
    updateGameState();
    drawGameBoard();
    gameLoop(); 
  }, 200);
}

//reset the game when the snake collides with itself
function resetGame() {
  snake = [{ x: 10, y: 10 }];
  direction = { x: 0, y: 0 };
  score = 0;
  scoreDisplay.textContent = 'Score: 0';
  generateFood();
}

// Event listener for key presses
document.addEventListener('keydown', changeDirection);


gameLoop();

