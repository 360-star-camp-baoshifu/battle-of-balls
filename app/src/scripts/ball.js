export default class Ball {
    constructor (ctx,x,y,r,v,deg) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = this.randomColor();
        this.v = v;
        let _deg = deg;
        let that = this;
        Object.defineProperty(this,'deg',{
            set: function (value) {
                _deg = value;
            },
            get: function () {
                return _deg;
            }
        });
    }

    randomColor () {
        let colors = ['red', 'blue', 'brown', 'green', 'black', 'orange'];
        return colors[Math.floor(Math.random() * (colors.length - 1))];
    }

    drawCircle () {
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
    }

    drawSelf (width, heigth) {
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(width / 2, heigth / 2, this.r, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
    }

    move (interval) {
        // let [vx, vy] = [this.v * Math.cos(this.deg), this.v * Math.sin(this.deg)];
        let [vx, vy] = [this.v * this.deg[0], this.v * this.deg[1]];
        let [newx, newy] = [this.x + vx * interval/1000, this.y + vy * interval/1000];
        //边界判断
        this.x = (0 < newx - this.r && 3000 > newx + this.r) ? newx : this.x;
        this.y = (0 < newy - this.r && 3000 > newy + this.r) ? newy : this.y;
        this.drawCircle();
    }

    moveSelf (interval) {
        // let [vx, vy] = [this.v * Math.cos(this.deg), this.v * Math.sin(this.deg)];
        let [vx, vy] = [this.v * this.deg[0], this.v * this.deg[1]];
        let [newx, newy] = [this.x + vx * interval/1000, this.y + vy * interval/1000];
        //边界判断
        this.x = (0 < newx - this.r && 3000 > newx + this.r) ? newx : this.x;
        this.y = (0 < newy - this.r && 3000 > newy + this.r) ? newy : this.y;
        // console.log(this.x,this.y)
    }

    update (x, y, r, v, deg) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.v = v;
        this.deg = deg;
    }

    isInViewPort (viewx, viewy, viewwidth, viewheigth) {
        let vertexs = new Array(4).fill().map((_, i) => [viewx + viewwidth * (i % 2), viewy + viewheigth * Math.floor(i / 2)]);
        for (let key in vertexs) {
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
            this.ctx.closePath();
            if (this.ctx.isPointInPath(vertexs[key][0], vertexs[key][0])) {
                return true;
            }
        }
        if (vertexs[0][0] < this.x && this.x < vertexs[3][0] && vertexs[0][1] < this.y && this.y < vertexs[3][1]) {
            return true;
        }
        return false;
    }

    touchStart (otherball) {
        let distance = Math.sqrt(Math.pow(otherball.x - this.x, 2) + Math.pow(otherball.y - this.y, 2))
        if (distance < (otherball.r + this.r)) {
            return true;
        } else {
            return false;
        }
    }
}