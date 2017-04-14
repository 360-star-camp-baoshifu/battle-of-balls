export default class OthersLayer {
  constructor (width, height) {
    this.balls = [];
    this.width = width;
    this.height = height;
  }

  newPlayer (ball) {
    this.balls.push(ball);
  }

  PlayerQuit (ball) {
    let index = Array.indexOf(ball);
    this.balls.splice(index, 1);
  }

  drawBalls (ctx, viewx, viewy, viewwidth, viewheigth) {
    for (let key in this.balls) {
      if(this.balls[key].isInViewPort(ctx, viewx, viewy, viewwidth, viewheigth)) {
        this.balls[key].drawCircle(ctx);
      }
    }
  }
}