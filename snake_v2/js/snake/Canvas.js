export default class Canvas {
    constructor(container) {
        this.canvas = document.querySelector(container)
        this.context = canvas.getContext('2d')
    }
}