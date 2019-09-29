$(function(){
    let socket = io.connect('http://localhost:3000');
    let message = $('#message');
    let name = $('#name');
    let send_message = $('#send_message');
    let change_name = $('#change_name');
    let chat_window = $('#chat_window');

    change_name.submit((e) => {
        e.preventDefault();
        if (name.val().length > 0) {
        console.log(name.val());
        socket.emit('change_name', {name: name.val()});
        name.val('');
        }
    });

    send_message.submit((e) => {
        e.preventDefault();
        if (message.val().length > 0) {
            socket.emit('new_message', {message: message.val()});
            message.val('');
        }
    });

    socket.on('new_message', (data) => {
        chat_window.append(`<p>${data.username}: ${data.message}`);
    });
});