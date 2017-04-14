import showToast from "../assets/utils/showToast"

export default class OthersLayer {
    constructor () {
        this.balls = [];
        // this.width = width;
        // this.height = height;
        this.inView = new Set ();
        // this.touch = false;
    }

    newPlayer (ball) {
        this.balls.push(ball);
        let timeout = Math.random()*1000;
        setTimeout(()=>{
            showToast('玩家'+ball.id+'加入游戏');
        },timeout)
    }

    PlayerQuit (ball) {
        let index = Array.indexOf(ball);
        this.balls.splice(index, 1);
    }

    // drawBalls (viewx, viewy, viewwidth, viewheigth) {
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
            this.balls[key].move(16);
        }
        // console.log(this.inView);
    }
}