class Score {
    constructor() {
        this.value = 0
        this.seed = 0.001
        this.highestScore = 0
        this.scoreInterval = setInterval(() => {
            this.increaseSpeed()
        }, 1000);
    }

    update() {
        this.value += this.seed
    }

    render(scoreElement) {
        let renderScoreValue = Math.floor(this.value)
        scoreElement.innerText = renderScoreValue
    }

    reset() {
        clearInterval(this.scoreInterval)
        this.value = 0
        this.seed = 0.001
        if (this.value > this.highestScore)
            this.highestScore = this.value
    }

    increaseSpeed(seedValue = 0.0005) {
        this.seed += seedValue
    }
}

export default Score;