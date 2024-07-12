// funcion.js
document.addEventListener('DOMContentLoaded', () => {
    const mainMenu = document.getElementById('main-menu');
    const gameCanvas = document.getElementById('game-canvas');
    const ctx = gameCanvas.getContext('2d');
    const startGameButton = document.getElementById('start-game');

    startGameButton.addEventListener('click', () => {
        mainMenu.style.display = 'none';
        gameCanvas.style.display = 'block';
        startGame();
    });

    document.getElementById('instructions').addEventListener('click', () => {
        alert('Use the arrow keys to move the snake. Eat the food to grow longer. Avoid walls and yourself!');
    });

    document.getElementById('settings').addEventListener('click', () => {
        alert('Settings are not implemented yet.');
    });

    document.getElementById('high-scores').addEventListener('click', () => {
        alert('High Scores are not implemented yet.');
    });

    document.getElementById('sound').addEventListener('click', () => {
        alert('Sound settings are not implemented yet.');
    });

    let snake;
    let food;
    let direction;
    let score;
    let gameInterval;

    function startGame() {
        snake = [{ x: 10, y: 10 }];
        direction = 'RIGHT';
        score = 0;
        placeFood();
        gameInterval = setInterval(gameLoop, 100);
    }

    function placeFood() {
        food = {
            x: Math.floor(Math.random() * 30),
            y: Math.floor(Math.random() * 20)
        };
    }

    function gameLoop() {
        update();
        draw();
    }

    function update() {
        const head = { ...snake[0] };

        switch (direction) {
            case 'RIGHT':
                head.x += 1;
                break;
            case 'LEFT':
                head.x -= 1;
                break;
            case 'UP':
                head.y -= 1;
                break;
            case 'DOWN':
                head.y += 1;
                break;
        }

        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            score += 10;
            placeFood();
        } else {
            snake.pop();
        }

        if (head.x < 0 || head.x >= 30 || head.y < 0 || head.y >= 20) {
            gameOver();
        }

        for (let i = 1; i < snake.length; i++) {
            if (snake[i].x === head.x && snake[i].y === head.y) {
                gameOver();
            }
        }
    }

    function draw() {
        ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

        ctx.fillStyle = 'lime';
        snake.forEach(segment => {
            ctx.fillRect(segment.x * 20, segment.y * 20, 20, 20);
        });

        ctx.fillStyle = 'red';
        ctx.fillRect(food.x * 20, food.y * 20, 20, 20);

        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.fillText('Score: ' + score, 10, 20);
    }

    function changeDirection(event) {
        const keyPressed = event.keyCode;
        switch (keyPressed) {
            case 37:
                if (direction !== 'RIGHT') direction = 'LEFT';
                break;
            case 38:
                if (direction !== 'DOWN') direction = 'UP';
                break;
            case 39:
                if (direction !== 'LEFT') direction = 'RIGHT';
                break;
            case 40:
                if (direction !== 'UP') direction = 'DOWN';
                break;
        }
    }

    function gameOver() {
        clearInterval(gameInterval);
        alert('Game Over! Your score is ' + score);
        mainMenu.style.display = 'block';
        gameCanvas.style.display = 'none';
    }

    document.addEventListener('keydown', changeDirection);
});
