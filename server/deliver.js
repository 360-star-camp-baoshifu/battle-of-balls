function deliverAll(io) {
	let re = {
		data:[]
	};
	for(let user of users){
		let ball = user.ball;
		re.data.push(getBallInfo(ball));
	};
	io.emit('FRESH',JSON.stringfy(re));
}
function deliverSingle(user){
	let socket = user.socket,
		ball = user.ball,
		re = {
			data:[getBallInfo(ball)];
		};
	socket.emit('FRESH_SINGLE',JSON.stringfy(re));
}
function getBallInfo(ball){
	return {
		x:ball.x,
		y:ball.y,
		r:ball.r,
		sin:ball.sin,
		cos:ball.cos,
		speed:ball.speed
	}
}
function updateAllUsers(users){
	for(let user of users){
		user.ball._update();
	}
}