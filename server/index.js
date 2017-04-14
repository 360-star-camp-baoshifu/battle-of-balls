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
    console.log('new user')
    if (User.num() === 0) {
        User.list = []
        UserBall.list.length = 0
        FruitBall.list.length = 0
        for (let i = 0; i < FRUIT_NUM; i++) {
            new FruitBall(global.id++)
        }
    }

    let user = new User(socket)
    socket.on('init', () => {
        console.log('init')
        let user = new User(global.id++)
        socket.emit('init', user.id)
        console.log(JSON.stringify(User.getAllBalls()))
        io.emit('fresh', JSON.stringify(User.getAllBalls()))
        io.emit('fruit-fresh', JSON.stringify(FruitBall.list))
    })


    socket.on('change-degree', (dataRaw) => {
        let data = JSON.parse(dataRaw)
        let id = data.id
        let {sin,cos} = data
        let curUser = User.get(id)
        curUser.ball.setDeg(sin, cos)
        User.update()
        io.emit('fresh', JSON.stringify(User.getAllBalls()))
    })

    socket.on('eat-food', () => {
    	User.update();
    	let re = eatFood(FruitBall.list, UserBall.list),
            eatedLen = re.eatBalls.length;
        FruitBall.removeArr(re.eatBalls);
        for(let i = 0;i < eatedLen; i++){
            new FruitBall(global.id++);
        }
    	io.emit('fruit-fresh',JSON.stringify(FruitBall.list))
        io.emit('fresh',JSON.stringify(User.getAllBalls()))
    })
    socket.on('eat-ball', data => {
    	User.update();
    	let re = eatBalls(User.getAllBalls());
        User.removeArrById(re.eatBalls.map(ball => ball.id));
    	io.emit('fresh', JSON.stringify(User.getAllBalls()))
    })
    socket.on('disconnect', (socket) => {
        console.log('disconnect')
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
        console.log(User.list)
        User.list.splice(index, 1)
        io.emit('fresh', JSON.stringify(User.getAllBalls()))
    })
})


server.listen(3000, async () => {
    console.log('server is running on port 3000')
})
