const User = require('../model/User')
const { judgeAll } = require('./judge')
const judgeAllFromTwo = require('./judgeAllFromTwo')
function eatFood (balls1,balls2) {
	let judgeResult = judgeAllFromTwo(balls1,balls2,0);
	for(let ballWrapper of judgeResult.eatBalls){
		ballWrapper.ball.grow(ballWrapper.r)
	}
	return judgeResult;
}
function eatBalls (balls,callback,diff) {
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