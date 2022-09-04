import getRandomInt from "../toolsFunctions"

export default class Berry {
    constructor() {
        this.x
        this.y
        this.randomPosition()
    }

    // drawBerry() {
    //     context.beginPath();
    //     context.fillStyle = "#A00034";
    //     context.arc( berry.x + (config.sizeCell / 2 ), berry.y + (config.sizeCell / 2 ), config.sizeBerry, 0, 2 * Math.PI );
    //     context.fill();
    // }
    
    randomPosition() {
        berry.x = getRandomInt(0, gameCanvas.width / config.sizeCell) * config.sizeCell
        berry.y = getRandomInt(0, gameCanvas.height / config.sizeCell) * config.sizeCell
    }
}