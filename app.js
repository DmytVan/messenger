const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const mongoose = require('mongoose');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'secret', cookie: {maxAge: 60000}, resave: false, saveUninitialized: false}));
mongoose.connect('mongodb://localhost/test-project', {useNewUrlParser: true, useUnifiedTopology: true})
    .catch(err => {
        console.log(err)
        console.log('start the mongo db server')
    });
mongoose.set('debug', true);

require('./models/Users');
require('./models/Dialogues');
require('./config/passport');
require('./socket')
app.use(require('./routes'));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});


app.use((err, req, res, next) => {
    console.log(11)
    res.status(err.status || 500);

    res.json({
        error: err.message,
    });
});

module.exports = app;
