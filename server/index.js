const http = require('http')
const Koa = require('koa')
const app = new Koa()
const cors = require('kcors')
let User = require('./model/User')

app.use(cors({
    maxAge: 7 * 24 * 60 * 60
}))
app.use(async (ctx, next)=> {
    ctx.body = 'hello world!'
})
const server = http.createServer(app.callback())
const io = require('socket.io')(server)

io.on('connection', (socket) => {
    console.log('新连接')
    let user = new User(socket);

    const fruitNum = User.num() === 1 ? 20 : 5;


    io.emit('connected', User.getAllBalls());

    socket.on('move', (data) => {
    
    })

    socket.on('eatFood', data => {

    })

    socket.on('eatBall', data => {

    })
})

server.listen(3000, async () => {
    console.log('server is running on port 3000')
})
