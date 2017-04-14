const {judgePosWithBalls} = require('../controller/judge')
const TOTAL_WIDTH = 3000
class Ball {
    constructor (id, radius) {
        this.id = id
        this._generate(radius)
        Ball.list.push(this)
    }
    _generate (radius) {
        let x, y
        let r = radius
        let findResult = false
        while (!findResult) {
            x = radius + Math.random() * (TOTAL_WIDTH - radius * 2)
            y = radius + Math.random() * (TOTAL_WIDTH - radius * 2)
            if (judgePosWithBalls(x, y, r, Ball.list) !== null) {
                findResult = true
            }
        }
        this.x = x
        this.y = y
        this._radius = radius
    }
}

Ball.list = []

module.exports = Ball
