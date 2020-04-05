const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const Users = mongoose.model('Users');

passport.use(new LocalStrategy({
    usernameField: 'user[username]',
    passwordField: 'user[password]',
}, (username, password, done) => {
    console.log(username, password, 3333)
    Users.findOne({username})
        .then((user) => {
            if (!user || !user.validatePassword(password)) {
                return done(null, false, {error: 'username or password is invalid'});
            }

            return done(null, user);
        }).catch(done);
}));