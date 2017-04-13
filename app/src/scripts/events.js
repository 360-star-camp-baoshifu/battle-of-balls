// import io from 'socket.io'
import Ball from './ball'
import OthersLayer from './others'

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
    const SCREEN_WIDTH = window.innerWidth;
    const SCREEN_HEIGHT = window.innerHeight;
    const canvas_self = document.querySelector("#canvas-self");
    let ctx_self = canvas_self.getContext('2d');

    canvas_self.width = SCREEN_WIDTH;
    canvas_self.height = SCREEN_HEIGHT;

    let self = new Ball(1234,2242,30,1,0,true);

    self.drawCircle(ctx_self, SCREEN_WIDTH/2, SCREEN_HEIGHT/2);
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
}


export default bindEvents