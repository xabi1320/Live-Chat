var socket = io.connect('http://192.168.0.8:6677', { 'forceNew': true })

socket.on('messages', (data) => {
    console.log(data)
    render(data)
})

function render(data) {
    var html = data.map((message, index) => {
        return (`
            <div class="message">
                <strong>${message.nickname}</strong> dice:
                <p>${message.text}</p>
            </div>
        `)
    }).join(' ');

    var divMsgs = document.querySelector('#messages')
    divMsgs.innerHTML = html
    divMsgs.scrollTop = divMsgs.scrollHeight
}

function addMessage(e) {
    var message = {
        nickname: document.querySelector('#nickname').value,
        text: document.querySelector('#text').value
    }

    document.querySelector('#nickname').style.display = 'none'
    socket.emit('addMessage', message)
    document.querySelector('#text').value = ' '

    return false
}