
export default class OthersLayer {
    constructor () {
        this.balls = [];
        this.inView = new Set ();
    }

    newPlayer (ball) {
        this.balls.push(ball);
    }

    drawBalls (ball) {
        let touch = false;
        this.inView.forEach((value) => {
            value.drawCircle();
            if (value.touchStart(ball)) {
                touch = true;
            }
        });
        return touch;
    }

    drawBallsorNot (viewx, viewy, viewwidth, viewheigth) {
        for (let key in this.balls) {
            // this.balls[key].move(16);
            if(this.balls[key].isInViewPort(viewx, viewy, viewwidth, viewheigth)) {
                this.inView.add(this.balls[key]);
            } else {
                this.inView.delete(this.balls[key]);
            }
            this.balls[key].move();
        }
        // console.log(this.inView);
    }
}