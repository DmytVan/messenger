const io = require('socket.io')(3002);

const users = {};

io.on('connection', (client) => {
    let userId;
    client.on('setUserId', (id) => {
        userId = id;
        users[id] = client.id;
        client.emit('writeMessage', {ok: 'ok'});
    });
    client.on('sendMessage', (message) => {
        if (!users[message.recipientId]) {
            return;
        }
        io.sockets.connected[users[message.recipientId]].emit('acceptMessage', message);
    });
    client.on('disconnect', () => {
        delete users[userId];
    })
});