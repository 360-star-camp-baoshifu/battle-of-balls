const Ball = require('./ball')
class FruitBall extends Ball {
    constructor (id) {
        super(id, FruitBall.INIT_RADIUS)
        FruitBall.list.push(this)
    }
}
FruitBall.INIT_RADIUS = 10
FruitBall.list = []

module.exports = FruitBall