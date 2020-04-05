import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3002');

export const connectUserEmit = (id) => {
    socket.emit('setUserId', id);
};

export const sendMessageEmit = (message) => {
    socket.emit('sendMessage', message)
};

export const acceptMessageSubscribe = (cb) => {
socket.on('acceptMessage', (message) => {
    cb(message);
});
}

export default socket