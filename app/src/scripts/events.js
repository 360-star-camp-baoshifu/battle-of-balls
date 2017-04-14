import io from 'socket.io-client'
import Ball from './ball'
import OthersLayer from './others'
import Map from './mapper'
import throttle from 'lodash.throttle'

const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;


const canvas_self = document.querySelector("#canvas-self");
const canvas_balls = document.querySelector("#canvas-balls");
const mapCanvas = document.querySelector("#canvas-bg");
const foodCanvas = document.querySelector("#canvas-food");
const container = document.querySelector(".container");

let ctx_self = canvas_self.getContext('2d');
let ctx_balls = canvas_balls.getContext('2d');
let map = new Map({mapCanvas,foodCanvas,container});

let user = null;
let user_id = null;
let othersLayer = new OthersLayer();
let food = [];

let socket = io("http://www.baoshifu.com");

let ballFlag = false;
let foodFlag = false;
let flags = {};
let sendEat = throttle(()=>{
    if (ballFlag){
        socket.emit('eat-ball')
    }
    if (foodFlag){
        socket.emit('eat-food')
    }
},50);
Object.defineProperty(flags,'ballFlag', {
    set: function (value) {
        ballFlag = value;
        sendEat()
    },
    get: function () {
        return ballFlag;
    }
});
Object.defineProperty(flags,'foodFlag', {
    set: function (value) {
        foodFlag = value;
        // 发送数据
        sendEat()
    },
    get: function () {
        return foodFlag;
    }
});
Object.defineProperty(flags,'food', {
    set: function (value) {
        food = value;
        map.render(food,user);
    },
    get: function () {
        return food;
    }
});
function creatItems() {

    // self
    canvas_self.width = SCREEN_WIDTH;
    canvas_self.height = SCREEN_HEIGHT;
    canvas_balls.width = 3000;
    canvas_balls.height = 3000;

    user.drawSelf(SCREEN_WIDTH,SCREEN_HEIGHT);

    const container = document.querySelector(".container");


    (function moveSelf() {
        function move () {
            requestAnimationFrame(() => {
                user.moveSelf();
                map.foodCanvasMove(user);
                move();
            })
        }
        move()
    })();

    (function moveBalls() {
        requestAnimationFrame(()=>{
            othersLayer.drawBallsorNot(user.x-SCREEN_WIDTH/2,user.y-SCREEN_HEIGHT/2,SCREEN_WIDTH,SCREEN_HEIGHT);
            if (othersLayer.inView.size) {
                ctx_balls.clearRect(0,0,3000,3000);
                ballFlag = othersLayer.drawBalls(user)?true:ballFlag;//返回有无和其他玩家碰撞
            }
            moveBalls();
        });
        food.forEach((value) => {
            foodFlag = user.touchFood(value.x, value.y, value._radius)?true:foodFlag;//返回有无和食物碰撞
        })
    })();
}



function bindEvents() {
    const cover = document.querySelector('.cover'),
        start = document.querySelector('.btn-start');
    let init = false;
    start.addEventListener('click',function gameStart() {
        let temp;
        init = false;
        user = null;
        othersLayer.balls = [];
        document.addEventListener('mousemove',function (e) {
            // e.preventDefault();
            let x = e.pageX - SCREEN_WIDTH / 2;
            let y = e.pageY - SCREEN_HEIGHT / 2;
            let len = Math.sqrt(x * x + y * y);
            user.deg = [x / len, y / len];
            sendDeg();
        });
        // socket.on('connect', function(){
        // });
        socket.emit('init');
        socket.on('init',function (content) {
            user_id = parseInt(JSON.parse(content));
        });
        socket.on('fresh',function (content) {
            temp = JSON.parse(content);
            othersLayer.balls =[];
            if (!init){
                temp.forEach((item)=>{
                    if (item.id === user_id){
                        user = new Ball(ctx_self,item.x,item.y,item._radius,item.speed,[item.cos,item.sin],item.id);
                    } else {
                        othersLayer.newPlayer(new Ball(ctx_balls,item.x,item.y,item._radius,item.speed,[item.cos,item.sin],item.id))
                    }
                    init = true;
                });
                creatItems();
                cover.style.display = 'none';

            } else {
                let isDead = true;

                temp.forEach((item)=>{
                    if (item.id === user_id){
                        user.update(item.x,item.y,item._radius,item.speed,[item.cos,item.sin],item.id);
                        isDead = false;
                    } else {
                        othersLayer.newPlayer(new Ball(ctx_balls,item.x,item.y,item._radius,item.speed,[item.cos,item.sin],item.id))
                    }
                });
                if (isDead){
                    gameStart();
                }
            }
        });
        socket.on('fruit-fresh',function (content) {
            food = JSON.parse(content);
            console.log(food);

        });
    });
    let sendDeg = throttle(()=>{
        socket.emit('change-degree',JSON.stringify({"cos":user.deg[0], "sin": user.deg[1], "id": user.id}))
    },50);

}


export default bindEvents