const http = require('http');
const Koa = require('koa');
const app = new Koa();
const server = http.createServer(app.callback())
const io = require('socket.io')(server);
io.of('game').on('connection', async (socket) => {
    socket.emit('news', { hello: 'world' });
    socket.on('other event', async (data) => {
        console.log(data);
    });
});
server.listen(3000, async () => {
    console.log('server is running on port 3001')
});
