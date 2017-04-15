
export default class OthersLayer {
    constructor () {
        this.balls = [];
        this.inView = new Set ();
        this.user = {}
    }

    newPlayer (ball) {
        this.balls.push(ball);
    }

    drawBalls (ball) {
        // canvas.width = 0;
        // canvas.width = 3000;
        // canvas.getContext('2d').clearRect(0,0,3000,3000);
        // console.log('draw balls')
        let touch = false;
        this.inView.forEach((value) => {
            value.drawCircle(this.user);
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