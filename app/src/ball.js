export default class Ball {
  constructor (x,y,r,color,v,deg) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = this.randomColor();
    this.v = v;
    this.deg = deg;
    // this.x = x;
  }

  randomColor () {
    let colors = ['red', 'blue', 'brown', 'green', 'black', 'orange'];
    return colors[Math.floor(Math.random() * (colors.length - 1))];
  }

  drawCircle (ctx) {
    ctx.fillstyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }

  move (interval) {
    let [vx, vy] = [v * Math.cos(this.deg), v * Math.sin(this.deg)];
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