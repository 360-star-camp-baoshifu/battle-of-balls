const Ball = require('./ball')
const TOTAL_WIDTH = 3000
const debug = require('debug')('baoshifu')
class UserBall extends Ball{
    constructor (id) {
        super(id, UserBall.INIT_RADIUS)
        this._lastTimeStamp = Date.now()
        this.sin = Math.random()
        this.cos = Math.random()
        this.speed = UserBall.RADIUS_MULTI_SPEED / UserBall.INIT_RADIUS
        UserBall.list.push(this)
    }
    _update () {
        let nowTimeStamp = Date.now()
        debug(nowTimeStamp - this._lastTimeStamp)
        let path = (nowTimeStamp - this._lastTimeStamp) / 1000 * this.speed
        this.x += path * this.cos
        this.x = Math.max(0 + this.radius, Math.min(this.x, TOTAL_WIDTH - this.radius))
        this.y += path * this.sin
        this.y = Math.max(0 + this.radius, Math.min(this.y, TOTAL_WIDTH - this.radius))
        this._lastTimeStamp = nowTimeStamp
    }
    get pos () {
        return {
            x: this.x,
            y: this.y
        }
    }
    setDeg (sin, cos) {
        this.sin = sin
        this.cos = cos
    }
    set radius (r) {
        this.speed = Ball.RADIUS_MULTI_SPEED / r
        this._radius = r
    }
    get radius () {
        return this._radius
    }
    grow (radius) {
        this.radius = Math.sqrt(Math.pow(this.radius, 2) + Math.pow(radius, 2))
    }
}
UserBall.remove = function (ball) {
    let index = UserBall.list.indexOf(ball)
    if (!~index) {
        return
    }
    UserBall.list.splice(index, 1)
}
UserBall.RADIUS_MULTI_SPEED = 3000
UserBall.INIT_RADIUS = 30
UserBall.MIN_TIME_CALC_SPAN = 5
UserBall.list = []

module.exports = UserBall