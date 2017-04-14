const http = require('http')
const Koa = require('koa')
const app = new Koa()
const cors = require('kcors')

app.use(cors({
    maxAge: 7 * 24 * 60 * 60
}))
app.use(async (ctx, next)=> {
    ctx.body = 'hello world!'
})
const server = http.createServer(app.callback())
const io = require('socket.io')(server)

const User = require('./model/User')
const UserBall =  require('./model/user-ball')
const FruitBall = require('./model/fruit-ball')
const eatFood = require('./controller/eatFood')
const eatBalls = require('./controller/eatBalls')
const FRUIT_NUM = 20;

io.on('connection', (socket) => {
    if (User.num() === 0) {
        User._list = []
        UserBall._list = []
        FruitBall._list = []
        for (let i = 0; i < FRUIT_NUM; i++) {
            new FruitBall()
        }
    }

    let user = new User(socket);
    socket.emit('init', user.id)
    io.emit('new-user', JSON.stringify(User.getAllBalls()));

    socket.on('change-degree', (data) => {
        let data = JSON.parse(data)
        let id = data.id
    })

    socket.on('eat-food', data => {
    	User.update();
    	eatFood();
    	io.emit('FRESH',JSON.stringify(User.getAllBalls()));
    })

    socket.on('eat-ball', data => {
    	user.update();
    	eatBalls();
    	io.emit('FRESH',JSON.stringify(User.getAllBalls()));
    })
})
io.on('disconnect', (socket) => {
    let disconUser = User._list.find(user => user.socket === socket)

})

server.listen(3000, async () => {
    console.log('server is running on port 3000')
})
