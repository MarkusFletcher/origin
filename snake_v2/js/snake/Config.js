export default class Config {
    constructor() {
        this.sizeCell = 16
        this.sizeBerry = 4
        this.speed = 200
    }

    setSpeed(value) {
        this.speed = value
    }

    incSpeed(value) {
        this.speed += value
    }
}