var express = require('express')
var app = express()
var server = require('http').Server(app)
var io = require('socket.io')(server)

app.use(express.static('client'))

app.get('/holaMundo', (req, res) => {
    res.status(200).send('Hola Mundo desde una ruta')
})

var messages = [{
    id: 1,
    text: 'Bienvenido al Chat privado  de socket.io y NodeJS de Javier Pérez...',
    nickname: 'Bot - Xabi'
}]

io.on('connection', (socket) => {
    console.log('El cliente con ip: ' + socket.handshake.address + ' se ha conectado...')

    socket.emit('messages', messages)

    socket.on('addMessage', (data) => {
        messages.push(data)

        io.sockets.emit('messages', messages)
    })
})

server.listen(6677, () => {
    console.log('Sevidor está funcionando en http://localhost:6677')
})