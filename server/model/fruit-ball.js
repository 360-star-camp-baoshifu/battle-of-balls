const Ball = require('./ball')
class FruitBall extends Ball {
    static INIT_RADIUS = 10
    static list = []
    constructor (id) {
        super(id, FruitBall.INIT_RADIUS)
        FruitBall.list.push(this)
    }
}
module.exports = FruitBall