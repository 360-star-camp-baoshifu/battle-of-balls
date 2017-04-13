function judegBall(ball,balls){
	let surviveBalls = [],
		deadBalls = new Set();
	for(let balli of balls){
		let re = judge(ball,balli);
		if(re){
			deadBalls.add(re);
		}
	}
	for(let balli of balls){
		if(!deadBalls.has(balli))
			surviveBalls.push(balli);
	}
	return {
		surviveBalls:surviveBalls,
		deadBalls:Array.from(deadBalls)
	}
}
function judgeAll(balls){
	let surviveBalls = [],
		deadBalls = new Set();
	for(var i = 0;i < balls.length;i++){
		for(var j = i + 1;j < balls.length;j++){
			var re = judge(balls[i],balls[j]);
			if(re){
				deadBalls.add(re);
			}
		}
	}
	for(let balli of balls){
		if(!deadBalls.has(balli))
			surviveBalls.push(balli);
	}
	return {
		surviveBalls:surviveBalls,
		deadBalls:Array.from(deadBalls)
	}
}
function judge(ball1,ball2){
	if(ball1 === ball2) return null;
	let dis = Math.sqrt(Math.pow((ball1.x - ball2.x),2) + Math.pow((ball1.y - ball2.y),2)),
		sumR = ball1.r + ball2.r,
		diff = Math.min(ball1.r,ball2.r);
	if(sumR - dis > diff) return ball1.r > ball2.r ? ball2 : ball1;
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