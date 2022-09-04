export default class Score {
    constructor(containerCount, containerRecord) {
        this.$scoreCounter = document.querySelector(containerCount)
        this.$scoreRecord = document.querySelector(containerRecord)
        this.score = 0
        this.recordScore = localStorage.getItem('snakeRecordScore') || 0
    }


    incScore() {
        this.score++
        this.drawScore()
    }
    
    drawScore() {
        $scoreCounter.innerHTML = this.score
    }
    
    setScoreRecord() {
        if (this.score > this.recordScore) {
            this.recordScore = this.score
            localStorage.setItem('snakeRecordScore', this.recordScore)
        }
    }
    
    drawScoreRecord() {
        $scoreRecord.innerHTML = this.recordScore
    }
}