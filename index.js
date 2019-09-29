const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

const server = app.listen(3000);

const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log('new user connected');

    socket.username = 'anonymous';

    socket.on('change_name', (data) => {
        console.log(`changed name to ${data.name}`)
        socket.username = data.name;
    });

    socket.on('new_message', (data) => {
        io.sockets.emit('new_message', {username: socket.username, message: data.message})
    });
});