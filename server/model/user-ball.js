const Ball = require('./ball')
const TOTAL_WIDTH = 3000
class UserBall extends Ball{
    constructor (id) {
        super(id, UserBall.INIT_RADIUS)
        this.dirty = false
        this._lastTimeStamp = Date.now()
        this.sin = Math.random()
        this.cos = Math.random()
        this.speed = UserBall.RADIUS_MULTI_SPEED / UserBall.INIT_RADIUS
        UserBall.list.push(this)
    }
    _update () {
        if (this.dirty === false) {
            return
        }
        let nowTimeStamp = Date.now()
        let path = (nowTimeStamp - this._lastTimeStamp) * this.speed
        this.x += path * this.cos
        this.x = Math.max(0 + this.radius, Math.min(this.x, TOTAL_WIDTH - this.radius))
        this.y += path * this.sin
        this.y = Math.max(0 + this.radius, Math.min(this.y, TOTAL_WIDTH - this.radius))
        this._lastTimeStamp = nowTimeStamp
        this.dirty = false
    }
    dirt () {
        this.dirty = true
    }
    get pos () {
        this._update()
        return {
            x: this.x,
            y: this.y
        }
    }
    setDeg (sin, cos) {
        this._update()
        this.sin = sin
        this.cos = cos
    }
    set radius (r) {
        this._update()
        this.speed = Ball.RADIUS_MULTI_SPEED / r
        this._radius = r
    }
    get radius () {
        this._update()
        return this._radius
    }
    grow (radius) {
        this._update()
        this.radius = Math.sqrt(Math.pow(this.radius, 2) + Math.pow(radius, 2))
    }
}
UserBall.RADIUS_MULTI_SPEED = 3000
UserBall.INIT_RADIUS = 30
UserBall.MIN_TIME_CALC_SPAN = 5
UserBall.list = []

module.exports = UserBall