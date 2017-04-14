function judegBall(ball,balls){
	let surviveBalls = [],
		deadBalls = new Set(),
		eatBalls = new Set();
	for(let balli of balls){
		let re = judge(ball,balli);
		if(re){
			deadBalls.add(re[1]);
			eatBalls.add({ball:re[0],r:re[1].radius});
		}
	}
	for(let balli of balls){
		if(!deadBalls.has(balli)){}
			surviveBalls.push(balli);
	}
	for(let balli of eatBalls){
		if(deadBalls.has(balli.ball)){
			eatBalls.delete(balli);
		}
	}
	return {
		surviveBalls:surviveBalls,
		deadBalls:Array.from(deadBalls),
		eatBalls:Array.from(eatBalls)
	}
}
function judgeAll(balls,diff){
	let surviveBalls = [],
		deadBalls = new Set(),
		eatBalls = new Set();
	for(var i = 0;i < balls.length;i++){
		for(var j = i + 1;j < balls.length;j++){
			var re = judge(balls[i],balls[j],diff);
			if(re){
				deadBalls.add(re[1]);
				eatBalls.add({ball:re[0],r:re[1].radius});
			}
		}
	}
	for(let balli of balls){
		if(!deadBalls.has(balli))
			surviveBalls.push(balli);
	}
	for(let balli of eatBalls){
		if(deadBalls.has(balli.ball)){
			eatBalls.delete(balli);
		}
	}
	return {
		surviveBalls:surviveBalls,
		deadBalls:Array.from(deadBalls),
		eatBalls:Array.from(eatBalls)
	}
}
function judge(ball1,ball2,diff = Math.min(ball1.r,ball2.r) ){
	if(ball1 === ball2) return null;
	let dis = Math.sqrt(Math.pow((ball1.x - ball2.x),2) + Math.pow((ball1.y - ball2.y),2)),
		sumR = ball1.r + ball2.r;
	if(sumR - dis > diff) return ball1.r > ball2.r ? [ball2,ball1] : [ball1,ball2];
	return null;
}
export function judgePosWithBalls(x,y,r,balls){
	let ball = {
		x:x,
		y:y,
		r:r
	}
	return judegBall(ball,balls);
}