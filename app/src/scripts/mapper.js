const defaultOptions = {
    container: null,
    MAP_WIDTH: 3000,
    MAP_HEIGHT: 3000,
    SCREEN_WIDTH : window.innerWidth,
    SCREEN_HEIGHT : window.innerHeight,
};

function drawFoods(ctx, color, x, y, r) {
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
        this.mapCanvas = options.mapCanvas;
        this.foodCanvas = options.foodCanvas;
        this.mapCtx = this.mapCanvas.getContext('2d');
        this.foodCtx = this.foodCanvas.getContext('2d');
        this.container = options.container;
        this.foodCanvas.width = defaultOptions.MAP_WIDTH;
        this.foodCanvas.height = defaultOptions.MAP_HEIGHT;
        this.mapCanvas.width = defaultOptions.MAP_WIDTH;
        this.mapCanvas.height = defaultOptions.MAP_HEIGHT;
    }

    render(foods, user) {
        let mapCxt = this.mapCtx;
        let foodCxt = this.foodCtx;
        mapCxt.strokeStyle = '#FFCCCC';

        for(let i = 0; i < 31; i++){
            mapCxt.beginPath();
            mapCxt.moveTo(100*i,0);
            mapCxt.lineTo(100*i,3000);
            mapCxt.stroke();
            mapCxt.closePath();
            mapCxt.beginPath();
            mapCxt.moveTo(0,100*i);
            mapCxt.lineTo(3000,100*i);
            mapCxt.stroke();
            mapCxt.closePath();
        }

        foods.map((d, i) => {
            let {_x, _y, _r, _color} = d;
            drawFoods(foodCxt, _color, _x, _y, _r);
        });

        // transform: 'translate('+ defaultOptions.SCREEN_WIDTH / 2 - user.x + 289 + ','+ defaultOptions.SCREEN_HEIGHT / 2 - user.y - 289 +')'
        this.container.style.transform = 'translate('+ defaultOptions.SCREEN_WIDTH / 2 - user.x + 'px,'+ defaultOptions.SCREEN_HEIGHT / 2 - user.y  +'px)'

        // Object.assign(this.container.style, {
        //  // position: 'absolute',
        //     // top: user.x - defaultOptions.MAP_HEIGHT / 2 + 'px',
        //     // left: user.y - defaultOptions.MAP_WIDTH / 2 + 'px',
        // });
    }

    foodCanvasMove (user) {
        // Object.assign(this.mapCanvas.style, {
        //     position: 'absolute',
        //     left: defaultOptions.SCREEN_HEIGHT / 2 - user.x + 289 + 'px',
        //     top: defaultOptions.SCREEN_WIDTH / 2 - user.y - 289 + 'px',
        // });
        // Object.assign(this.foodCanvas.style, {
        //     position: 'absolute',
        //     left: defaultOptions.SCREEN_HEIGHT / 2 - user.x + 289 + 'px',
        //     top: defaultOptions.SCREEN_WIDTH / 2 - user.y - 289 + 'px',
        // });
        // console.log('ox');
        // console.log('translate('+ (defaultOptions.SCREEN_WIDTH / 2 - user.x)  + 'px,'+ (defaultOptions.SCREEN_HEIGHT / 2 - user.y) + 'px)')
        this.container.style.transform = 'translate('+ (defaultOptions.SCREEN_WIDTH / 2 - user.x)  + 'px,'+ (defaultOptions.SCREEN_HEIGHT / 2 - user.y) + 'px)'

    }
}