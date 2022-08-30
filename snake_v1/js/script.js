const $scoreCounter = document.querySelector('.game__scope-count')
let score = 0
let gamePause = true

const config = {
    step: 0,
    maxStep: 16 + score,
    sizeCell: 16,
    sizeBerry: 4
}

const snake = {
    x: 160,
    y: 160,
    speedX: config.sizeCell,
    speedY: 0,
    body: [],
    length: 3
}

const berry = {
    x: 0,
    y: 0
}

let gameCanvas = document.querySelector('.game__canvas')
let context = gameCanvas.getContext('2d')

drawScore()


function gameLoop() {
    requestAnimationFrame(gameLoop)
    if (!gamePause) {
        if (++config.step < config.maxStep) {
            return
        }
        config.step = 0

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
        randomPositionBerry()
    }

    // console.log('snake: ' + snake.x + ' : ' + snake.x)
    // console.log('berry: ' + berry.x + ' : ' + berry.x)
}

function drawBerry() {
    context.beginPath();
	context.fillStyle = "#A00034";
	context.arc( berry.x + (config.sizeCell / 2 ), berry.y + (config.sizeCell / 2 ), config.sizeBerry, 0, 2 * Math.PI );
	context.fill();
}

function randomPositionBerry() {
    berry.x = getRandomInt(0, gameCanvas.width / config.sizeCell) * config.sizeCell
    berry.y = getRandomInt(0, gameCanvas.height / config.sizeCell) * config.sizeCell
}

function incScore() {
    score++
    drawScore()
}

function drawScore() {
    $scoreCounter.innerHTML = score
}

function getRandomInt(min, max) {
    let rand = Math.floor( Math.random() * ( max - min ) + min )
    console.log(rand)
    console.log(min + ' - ' + max)
    return rand
}

function collision() {

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