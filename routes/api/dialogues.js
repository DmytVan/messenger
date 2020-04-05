const mongoose = require('mongoose');
const router = require('express').Router();
const auth = require('../auth');
const Dialogues = mongoose.model('Dialogues');
const Users = mongoose.model('Users');
const ObjectID = require('mongodb').ObjectID;



router.get('/new', auth.required, function (req, res, next) {
    const username = req.query.username;
    const {payload} = req;
    Users.findOne({username})
        .then(user => {
            if (!user) {
                return res.json({error: 'User is not found'})
            }
            return res.json({id: user._id})
        })
        .catch(err => {
            res.json({error: err.messages});
        })
});

router.post('/newMessage', auth.required, function (req, res, next) {
    const {payload: {id}, body: {recipientId, message, date}} = req;
    const [firstId, secondId] = [id, recipientId].sort((a, b) => parseInt(a, 16) - parseInt(b, 16));

    const newMessage = {
        message: message,
        sender: id,
        date: date,
        _id: new ObjectID()
    };
    const incMessage = `countNewMessages.${recipientId}`;
    Dialogues.findOne({firstId, secondId})
        .then(dialog => {
            if (dialog) {
                return Dialogues.updateOne({firstId, secondId}, {
                    $push: {messages: newMessage},
                    $inc: {[incMessage]: 1},
                    $set: {lastChange: +new Date(date)},
                })
            } else {
                const users = {};
                Users.findOne({_id: firstId}, {username: 1})
                    .then(firsUser => {
                        users[firsUser._id] = firsUser.username;
                        return Users.findOne({_id: secondId}, {username: 1})
                    })
                    .then(secondUser => {
                        users[secondUser._id] = secondUser.username;
                        const newDialog = new Dialogues({
                            firstId,
                            secondId,
                            users,
                            messages: [],
                            countNewMessages: {[id]: 0, [recipientId]: 0}
                        });
                        return newDialog.save()
                    })
                    .then(() => {
                        return Dialogues.updateOne({firstId, secondId}, {
                            $push: {messages: newMessage},
                            $inc: {[incMessage]: 1}
                        }, {new: true})
                    })
            }
        })
        .then(dialog => {
            res.json({id: newMessage._id})
        })
        .catch(err => {
            res.json({error: err.messages})
        });
});

router.get('/all', auth.required, function (req, res, next) {
    const {payload: {id}} = req;
    Dialogues.find({$or: [{firstId: id}, {secondId: id}]}, {messages: {$slice : -1}, firstId: 1, secondId: 1, countNewMessages: 1, users: 1, lastChange:1}).sort({lastChange:-1})
        .then(dialogues => {
            return res.json(dialogues.map(dialog => {
                const senderId = dialog.firstId === id ? dialog.secondId : dialog.firstId;
                return {
                    _id: dialog._id,
                    id: senderId,
                    username: dialog.users[senderId],
                    countOfNewMessages: dialog.countNewMessages[id],
                    lastMessage: dialog.messages[0],
                    lastChange: dialog.lastChange
                }
            }))
        })
        .catch(err => {
            res.json({error: err.messages});
        })
});

router.get('/dialog', auth.required, function (req, res, next) {
    const {query: {recipientId}, payload: {id}} = req;
    const [firstId, secondId] = [id, recipientId].sort((a, b) => parseInt(a, 16) - parseInt(b, 16));
    Dialogues.findOne({firstId, secondId}, {messages: 1})
        .then(result => {
            res.json(result.messages)
        })
});

router.get('/viewedMessages', auth.required, function (req, res, next) {
    const {payload: {id}, query: {recipientId}} = req;
    const countMessage = `countNewMessages.${id}`;
    const [firstId, secondId] = [id, recipientId].sort((a, b) => parseInt(a, 16) - parseInt(b, 16));
    Dialogues.updateOne({firstId, secondId}, {$set: {[countMessage]: 0}})
        .then(result => {
            res.json({ok: 'ok'});
        })
        .catch(err => {
            res.json({error: err.messages});
        })
});


module.exports = router;