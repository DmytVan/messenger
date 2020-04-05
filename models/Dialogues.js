const mongoose = require('mongoose');

const {Schema} = mongoose;

const DialoguesSchema = new Schema({
    firstId: {
        type: String,
        required: true
    },
    secondId: {
        type: String,
        required: true
    },
    users: Object,
    messages: [],
    lastChange: Number,
    countNewMessages: Object
});


mongoose.model('Dialogues', DialoguesSchema);

