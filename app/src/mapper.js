const defaultOptions = {
	container: null,
	MAP_WIDTH: 6000,
	MAP_HEIGHT: 6000,
	USER_WIDTH: 600,
	USER_HEIGHT: 600,
};

function drawFoods(cxt, color, x, y, r) {
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc(x, y, r, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.fill();
}

export default class Mapper{
	constructor(options) {

		options = Object.assign({}, defaultOptions, options);

		this.options = options;
		let {width, height} = options;
		this.width = width, this.height = height;

		if(options.render) {
			this.render();
		}
	}

	render(foods, user) {
		let options = this.options;

		let container = options.container || document.getElementsByClassName('container');

		let mapCanvas = document.createElement('canvas');
		mapCanvas.width = this.width, mapCanvas.height = this.height;

		let foodCanvas = mapCanvas.cloneNode(true);

		container.appendChild(mapCanvas);
		container.appendChild(foodCanvas);

		let mapCxt = mapCanvas.getContext('2d');
		let foodCxt = foodCanvas.getContext('2d');

		foods.map((d, i) => {
			let {_x, _y, _r, _color} = d;
			drawFoods(foodCxt, _color, _x, _y, _r);
		});

		Object.assign(mapCanvas.style, {
			position: 'absolute',
			top: user.x - MAP_HEIGHT / 2 + 'px',
			left: user.y - MAP_WIDTH / 2 + 'px',
		});
	}

	foodCanvasMove (user) {
		Object.assign(mapCanvas.style, {
			position: 'absolute',
			top: user.x - MAP_HEIGHT / 2 + 'px',
			left: user.y - MAP_WIDTH / 2 + 'px',
		});
	}
}