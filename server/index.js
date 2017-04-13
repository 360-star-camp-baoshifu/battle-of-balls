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


io.on('connection', (socket) => {

    socket.emit('news', { hello: 'world' })
    socket.on('other event', (data) => {
        console.log(data)
    })
})
server.listen(3000, () => {
    console.log('server is running on port 3000')
})
