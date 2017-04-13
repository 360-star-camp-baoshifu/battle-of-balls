class Ball {
    static MIN_TIME_CALC_SPAN = 5
    constructor (x, y, deg, r, type) {
        this.x = x
        this.y = y
        this.speed = 1 / r
        this._deg = deg
        this._radius = r
        this.type = type
        this._lastTimeStamp = Date.now()
    }
    _update () {
        let nowTimeStamp = Date.now()
        if (nowTimeStamp - this._lastTimeStamp < this.MIN_TIME_CALC_SPAN) {
            return
        }
        let path = (nowTimeStamp - this._lastTimeStamp) * this.speed
        this.x += path * Math.cos(this._deg)
        this.y += path * Math.sin(this._deg)
        this._lastTimeStamp = nowTimeStamp
    }
    get pos () {
        return {
            x: this.x,
            y: this.y
        }
    }
    set deg (deg) {
        this._update()
        this._deg = deg
    }
    get deg () {
        return this._deg
    }
    set radius (r) {
        this._update()
        this.speed = 1 / r
        this._radius = r
    }
    get radius () {
        this._update()
        return this._radius
    }
    grow (radius) {
        this.radius = Math.sqrt(Math.pow(this.radius, 2) + Math.pow(radius, 2))
    }
}
export default Ball
