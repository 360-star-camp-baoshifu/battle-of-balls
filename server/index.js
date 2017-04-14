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
const { eatFood, eatBalls } = require('./controller/eat')
const FRUIT_NUM = 20
global.id = 0

io.on('connection', (socket) => {
    if (User.num() === 0) {
        User.list = []
        UserBall.list = []
        FruitBall.list = []
        for (let i = 0; i < FRUIT_NUM; i++) {
            new FruitBall(global.id++)
        }
    }

    let user = new User(socket)
    socket.on('init', () => {
        let user = new User(global.id++)
        socket.emit('init', user.id)
    })

    io.emit('new-user', JSON.stringify(User.getAllBalls()))
    socket.on('change-degree', (dataRaw) => {
        let data = JSON.parse(dataRaw)
        let id = data.id
        let {sin,cos} = data
        let curUser = User.get(id)
        curUser.ball.setDeg(sin, cos)
        User.update()
        io.emit('FRESH', JSON.stringify(User.getAllBalls()))
    })

    socket.on('eat-food', () => {
    	User.update();
    	let re = eatFood(FruitBall.list),
            eatedLen = re.eatBalls.length;
        FruitBall.removeArr(re.eatBalls);
        for(let i = 0;i < eatedLen; i++){
            new FruitBall(global.id++);
        }
    	io.emit('FRESH',JSON.stringify(FruitBall.list));
    })

    socket.on('eat-ball', data => {
    	User.update();
    	let re = eatBalls(User.getAllBalls());
        User.removeArrById(re.eatBalls.map(ball => ball.id));
    	io.emit('FRESH', JSON.stringify(User.getAllBalls()))
    })
})
io.on('disconnect', (socket) => {
    let index = 0;
    let disconnectUser
    for (let i = 0 ; i < User.list.length; i++) {
        if (socket === User.socket) {
            index = i
            disconnectUser = User[i]
        }
    }
    if (!disconnectUser) {
        return
    }
    User.list.splice(index, 1)
    if (User.list.length === 0) {
        FruitBall.list.length = 0
        UserBall.list = 0
    }
    io.emit('user-position', JSON.stringify(User.getAllBalls()))
})

server.listen(3000, async () => {
    console.log('server is running on port 3000')
})
