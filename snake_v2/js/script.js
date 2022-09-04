let gamePause = true

let now, then, elapsed

const snake = {
    x: 160,
    y: 160,
    speedX: config.sizeCell,
    speedY: 0,
    body: [],
    length: 3
}

drawScore()
drawScoreRecord()

randomPositionBerry()
then = Date.now()

function gameLoop() {
    requestAnimationFrame(gameLoop)

    now = Date.now()
    elapsed = now - then

    if (!gamePause) {
        if (elapsed < config.speed) return
        then = now

        if (collisionBorder() || collisionSelf()) restartGame()
        
        context.clearRect( 0, 0, gameCanvas.width, gameCanvas.height )
        drawSnake()
        drawBerry()
    }
}

function drawSnake() {
    snake.x += snake.speedX
    snake.y += snake.speedY

    snake.body.unshift({x: snake.x, y: snake.y})
    if (snake.body.length > snake.length) {
        snake.body.pop()
    }

    snake.body.forEach((el, index) => {
        if (index == 0) {
            context.fillStyle = '#00d7f7'
        } else {
            context.fillStyle = '#66B0BB'
        }

        context.fillRect( el.x, el.y, config.sizeCell, config.sizeCell )
    })

    if (snake.x == berry.x && snake.y == berry.y) {
        snake.length++
        incScore()
        updateSpeed()
        randomPositionBerry()
    }

    // console.log('snake: ' + snake.x + ' : ' + snake.x)
    // console.log('berry: ' + berry.x + ' : ' + berry.x)
}





function updateSpeed() {
    
}



function collisionBorder() {
    if (
        snake.x < 0 ||
        snake.y < 0 || 
        snake.x > 464 ||
        snake.y > 464
        ) {
            return true
        }
    return false
}

function collisionSelf() {
    snake.body.forEach((el, index) => {
        if (el.x == snake.body[0].x && el.y == snake.body[0].y) {
            if (index != 0) {
                return true
            }
        }
    })
    return false
}

function collisionSelf2() {
    console.log('+++++++++++++++++++++')
    if (snake.body.find((el) => {
        console.log(el)
        console.log({x: snake.x, y: snake.y})
        console.log('==========')
        return el == {x: snake.x, y: snake.y}
        // return el.x == snake.x && y == snake.y
    })) {
        restartGame()
    }
}

function restartGame() {
    setScoreRecord()
    drawScoreRecord()
    score = 0
    gamePause = true

    snake.x = 160
    snake.y = 160
    snake.body = []
    snake.length = 3

    drawScore()
}

document.addEventListener('keydown', e => {
    switch(e.code) {
        case 'KeyW':
            if (snake.speedY == config.sizeCell) break
            snake.speedX = 0
            snake.speedY = -config.sizeCell
            break
        case 'KeyD':
            if (snake.speedX == -config.sizeCell) break
            snake.speedX = config.sizeCell
            snake.speedY = 0
            break
        case 'KeyS':
            if (snake.speedY == -config.sizeCell) break
            snake.speedX = 0
            snake.speedY = config.sizeCell
            break
        case 'KeyA':
            if (snake.speedX == config.sizeCell) break
            snake.speedX = -config.sizeCell
            snake.speedY = 0
            break
        case 'Space':
            gamePause = !gamePause
        break
    }
})


requestAnimationFrame(gameLoop)

// Paws 349