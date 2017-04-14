export default class Ball {
    constructor (ctx,x,y,r,v,deg,id) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.r = r;
        this.id = id;
        this.color = this.randomColor();
        this.v = v;
        let _deg = deg;
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
        // this.ctx
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
        console.log('move: '+ this.x + ' , ' +this.y);
    }

    update (x, y, r, v, deg, id) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.v = v;
        this.deg = deg;
        this.id = id;
    }

    isInViewPort (viewx, viewy, viewwidth, viewheigth) {
        let vertexes = new Array(4).fill().map((_, i) => [viewx-100 + (viewwidth+100) * (i % 2), viewy-100 + (viewheigth+100) * Math.floor(i / 2)]);
        for (let key in vertexes) {
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
            this.ctx.closePath();
            if (this.ctx.isPointInPath(vertexes[key][0], vertexes[key][0])) {
                return true;
            }
        }
        return vertexes[0][0] < this.x && this.x < vertexes[3][0] && vertexes[0][1] < this.y && this.y < vertexes[3][1];
    }

    touchStart (otherball) {
        let distance = Math.sqrt(Math.pow(otherball.x - this.x, 2) + Math.pow(otherball.y - this.y, 2));
        if (distance < (otherball.r + this.r)) {
            return true;
        } else {
            return false;
        }
    }
    touchFood (x,y,r) {
        let distance = Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2));
        if (distance < (r + this.r)) {
            return true;
        } else {
            return false;
        }
    }
}