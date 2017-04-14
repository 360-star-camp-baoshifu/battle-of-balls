export function eatBalls () {
	eat();
}
export function eatFood () {
	eat(0);
}
function eat (diff) {
	let balls = User.getAllBalls(),
		judgeResult = judgeAll(balls,diff);
	for(let ballWrapper of judgeResult.eatBalls){
		ballWrapper.ball.grow(ballWrapper.r)
	}
}