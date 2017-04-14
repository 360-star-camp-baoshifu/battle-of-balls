const Ball = require('./ball')
class FruitBall extends Ball {
    constructor (id) {
        super(id, FruitBall.INIT_RADIUS)
        FruitBall.list.push(this)
    }
}
FruitBall.INIT_RADIUS = 10
FruitBall.list = []
FruitBall.removeArr = function (fruitArr) {
    FruitBall.list = FruitBall.list.filter(fruit => {
        return  !~fruitArr.indexOf(fruit)
    })
}
FruitBall.remove = function (fruit) {
    let index = FruitBall.list.indexOf(fruit)
    if (!~index) {
        return
    }
    FruitBall.list.splice(index, 1)
}
module.exports = FruitBall