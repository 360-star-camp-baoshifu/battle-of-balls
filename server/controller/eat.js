const User = require('../model/User')
const { judgeAll } = require('./judge')

function eatBalls () {
	eat();
}
function eatFood () {
	eat(0);
}
function eat (diff) {
	let balls = User.getAllBalls(),
		judgeResult = judgeAll(balls,diff);
	for(let ballWrapper of judgeResult.eatBalls){
		ballWrapper.ball.grow(ballWrapper.r)
	}
}
module.exports = {
	eatBalls,
	eatFood
}