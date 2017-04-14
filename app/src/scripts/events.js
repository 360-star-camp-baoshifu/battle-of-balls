// import io from 'socket.io'
import Ball from './ball'
import OthersLayer from './others'
import Map from './mapper'

const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;

const canvas_self = document.querySelector("#canvas-self");
let ctx_self = canvas_self.getContext('2d');
let user = new Ball(ctx_self,SCREEN_WIDTH/2,SCREEN_HEIGHT/2,30,250,[0,1]);


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
    })()

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
    socketStart(cover);
    document.addEventListener('mousemove',function (e) {
        // e.preventDefault();
        let x = e.pageX - SCREEN_WIDTH / 2;
        let y = e.pageY - SCREEN_HEIGHT / 2;
        let len = Math.sqrt(x * x + y * y);
        user.deg = [x / len, y / len];
    })
}


export default bindEvents