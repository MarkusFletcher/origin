const $scoreCounter = document.querySelector('.game__score-count')
const $scoreRecord = document.querySelector('.game__score-record')

let score = 0
let recordScore = localStorage.getItem('snakeRecordScore') || 0
let gamePause = true

let now, then, elapsed

let $speed = document.querySelector('.game__speed')

const config = {
    sizeCell: 16,
    sizeBerry: 4,
    speed: 200 //200
}

const snake = {
    x: 160,
    y: 160,
    speedX: config.sizeCell,
    speedY: 0,
    body: [],
    length: 3,
    canTurn: true
}

const berry = {
    x: 0,
    y: 0
}

let gameCanvas = document.querySelector('.game__canvas')
let context = gameCanvas.getContext('2d')

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

        context.clearRect( 0, 0, gameCanvas.width, gameCanvas.height )
        drawSnake()
        drawBerry()
        if (collisionBorder() || collisionSelf()) restartGame()
        snake.canTurn = true
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

function setScoreRecord() {
    if (score > recordScore) {
        recordScore = score
        localStorage.setItem('snakeRecordScore', recordScore)
    }
}

function drawScoreRecord() {
    $scoreRecord.innerHTML = recordScore
}

function updateSpeed() {
    
}

function getRandomInt(min, max) {
    let rand = Math.floor( Math.random() * ( max - min ) + min )
    return rand
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
    // snake.body.forEach((el, index) => {
    //     if (el.x == snake.body[0].x && el.y == snake.body[0].y) {
    //         if (index != 0) {
    //             return true
    //         }
    //     }
    // })
    for ( let i = 1; i < snake.length; i++ ) {
        if ( snake.body[0].x == snake.body[i].x && snake.body[0].y == snake.body[i].y) {
            console.log('kaboom')
            return true
        }
    }

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
            if (snake.speedY == config.sizeCell || !snake.canTurn) break
            snake.speedX = 0
            snake.speedY = -config.sizeCell
            snake.canTurn = false
            break
        case 'KeyD':
            if (snake.speedX == -config.sizeCell || !snake.canTurn) break
            snake.speedX = config.sizeCell
            snake.speedY = 0
            snake.canTurn = false
            break
        case 'KeyS':
            if (snake.speedY == -config.sizeCell || !snake.canTurn) break
            snake.speedX = 0
            snake.speedY = config.sizeCell
            snake.canTurn = false
            break
        case 'KeyA':
            if (snake.speedX == config.sizeCell || !snake.canTurn) break
            snake.speedX = -config.sizeCell
            snake.speedY = 0
            snake.canTurn = false
            break
        case 'Space':
            gamePause = !gamePause
        break
    }
})

document.addEventListener('input', e => {
    config.speed = Number(e.target.value) || 200
})


requestAnimationFrame(gameLoop)

// Paws 349