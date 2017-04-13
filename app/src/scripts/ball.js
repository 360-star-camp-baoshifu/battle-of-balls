export default class Ball {
    constructor (x,y,r,v,deg,isSelf) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.isSelf = isSelf;
        this.color = this.randomColor();
        this.v = v;
        this.deg = deg;
    }

    randomColor () {
        let colors = ['#f33', '#6cf', '#a1a1a1', '#c69', '#333', '#96c'];
        return colors[Math.floor(Math.random() * (colors.length - 1))];
    }

    drawCircle (ctx,x,y) {
        console.log(this.color)
        ctx.beginPath();
        ctx.fillStyle = this.color;
        if(this.isSelf){
            ctx.arc(x, y, this.r, 0, 2 * Math.PI);
        } else {
            ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        }
        ctx.closePath();
        ctx.fill();
    }

    move (interval) {
        let [vx, vy] = [this.v * Math.cos(this.deg), this.v * Math.sin(this.deg)];
        let [newx, newy] = [this.x + vx * interval, this.y + vy * interval];
        //边界判断
        this.x = (0 < newx - this.r && 3000 > newx + this.r) ? newx : this.x;
        this.y = (0 < newy - this.r && 3000 > newy + this.r) ? newy : this.y;
        this.drawCircle();
    }

    update (x, y, r, v, deg) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.v = v;
        this.deg = deg;
    }

    isInViewPort (ctx, viewx, viewy, viewwidth, viewheigth) {
        let vertexs = new Array(4).fill().map((_, i) => [viewx + viewwidth * (i % 2), viewy + viewheigth * Math.floor(i / 2)]);
        for (let key in vertexs) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.R, 0, 2*Math.PI);
            ctx.closePath();
            if (ctx.ctx.isPointInPath(vertexs[key][0], vertexs[key][0])) {
                return true;
            }
        }
        if (vertexs[0][0] < this.x && this.x < vertexs[3][0] && vertexs[0][1] < this.y && this.y < vertexs[3][1]) {
            return true;
        }
        return false;
    }

    eat (otherball) {
        let distance = Math.sqrt(Math.pow(otherball.x - this.x, 2) + Math.pow(otherball.y - this.y, 2))
        if (distance < (otherball.r + this.r)/5) {
            return true;
        } else {
            return false;
        }
    }
}