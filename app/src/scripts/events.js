// import io from 'socket.io'
import Ball from './ball'
import OthersLayer from './others'
import Map from './mapper'
import throttle from 'lodash.throttle'

const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;

let messageFlag = false;
let flags = {

}
let sendEat = throttle(()=>{

},50);
Object.defineProperty(flags,'messageFlag', {
    set: function (value) {
        messageFlag = value;
        // 发送数据
        sendEat()
    },
    get: function () {
        return messageFlag;
    }
})
const canvas_self = document.querySelector("#canvas-self");
const canvas_balls = document.querySelector("#canvas-balls");
let ctx_self = canvas_self.getContext('2d');
let ctx_balls = canvas_balls.getContext('2d');
canvas_balls.width = 3000;
canvas_balls.height = 3000;
let balls_arr = [{
    ctx: ctx_balls,
    x: 300,
    y: 300,
    r: 30,
    v: 250,
    deg: [0.6,0.8],
    id: 10002
},{
    ctx: ctx_balls,
    x: 136,
    y: 289,
    r: 30,
    v: 250,
    deg: [-1,0],
    id: 10003
},{
    ctx: ctx_balls,
    x: 2366,
    y: 1289,
    r: 30,
    v: 250,
    deg: [0.8,0.6],
    id: 10004
}];

let user = new Ball(ctx_self,SCREEN_WIDTH/2,SCREEN_HEIGHT/2,30,250,[0,1],10001);

let othersLayer = new OthersLayer();
balls_arr.forEach((item)=>{
    othersLayer.newPlayer(new Ball(item.ctx,item.x,item.y,item.r,item.v,item.deg,item.id))
});

function socketStart(cover) {
    // let socket = io("http://localhost:3000/");
    // socket.on('connect', function(){
    //     console.log(socket.id);
    //     cover.style.display = 'none';
    // });
    cover.style.display = 'none';
    creatSelf();
}


function creatSelf() {

    canvas_self.width = SCREEN_WIDTH;
    canvas_self.height = SCREEN_HEIGHT;

    user.drawSelf(SCREEN_WIDTH,SCREEN_HEIGHT);
    const mapCanvas = document.querySelector("#canvas-bg");
    const foodCanvas = document.querySelector("#canvas-food");
    const container = document.querySelector(".container");

    let map = new Map({mapCanvas,foodCanvas,container});

    let food = [{
        _x: SCREEN_WIDTH/3,
        _y: SCREEN_HEIGHT/3,
        _r: 10,
        _color: '#6cf'
    },{
        _x: SCREEN_WIDTH/4,
        _y: SCREEN_HEIGHT/4,
        _r: 10,
        _color: '#6cf'
    },{
        _x: SCREEN_WIDTH/6,
        _y: SCREEN_HEIGHT/3*2,
        _r: 10,
        _color: '#6cf'
    }];

    map.render(food,user);
    (function moveFoods() {
        requestAnimationFrame(()=>{
            user.moveSelf(16);
            map.foodCanvasMove(user);

            moveFoods();
        })
    })();

    (function moveBalls() {
        requestAnimationFrame(()=>{
            othersLayer.drawBallsorNot(user.x-SCREEN_WIDTH/2,user.y-SCREEN_HEIGHT/2,SCREEN_WIDTH,SCREEN_HEIGHT);
            if (othersLayer.inView.size) {
                ctx_balls.clearRect(0,0,3000,3000);
                messageFlag = othersLayer.drawBalls(user)?true:messageFlag;//返回有无和其他玩家碰撞
            }
            moveBalls();
        });
        food.forEach((value) => {
            messageFlag = user.touchFood(value._x, value._y, value._r)?true:messageFlag;//返回有无和食物碰撞
        })
    })();
}



function bindEvents() {
    const cover = document.querySelector('.cover'),
        start = document.querySelector('.btn-start');
    // (function () {
    //     start.addEventListener('click',function () {
    //         socketStart(cover);
    //     })
    //
    // })()
    let sendDeg = throttle(()=>{

    },50);
    socketStart(cover);
    document.addEventListener('mousemove',function (e) {
        // e.preventDefault();
        let x = e.pageX - SCREEN_WIDTH / 2;
        let y = e.pageY - SCREEN_HEIGHT / 2;
        let len = Math.sqrt(x * x + y * y);
        user.deg = [x / len, y / len];
        sendDeg();
    })
}


export default bindEvents