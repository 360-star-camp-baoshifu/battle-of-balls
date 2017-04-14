const User = require('../model/User')
const { judgeAll } = require('./judge')

function eatBalls (balls) {
	return eat(balls);
}
function eatFood (balls) {
	return eat(balls,0);
}
function eat (balls,diff) {
	let judgeResult = judgeAll(balls,diff);
	for(let ballWrapper of judgeResult.eatBalls){
		ballWrapper.ball.grow(ballWrapper.r)
	}
	return judgeResult;
}
module.exports = {
	eatBalls,
	eatFood
}