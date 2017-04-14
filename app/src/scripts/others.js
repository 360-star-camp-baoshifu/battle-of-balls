import showToast from "../assets/utils/showToast"

export default class OthersLayer {
    constructor (width, height) {
        this.balls = [];
        this.width = width;
        this.height = height;
        this.inView = new Set ();
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

    drawBalls (viewx, viewy, viewwidth, viewheigth) {
        // ctx_balls.clearRect(viewx, viewy, viewwidth, viewheight);
        this.inView.forEach((key,value) => {value.drawCircle();});
        // for (let key in this.balls) {
        //     if(this.balls[key].isInViewPort(viewx, viewy, viewwidth, viewheigth)) {
        //         this.balls[key].drawCircle();
        //     }
        // }
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