const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');

router.post('/', auth.optional, (req, res, next) => {
    const {body: {user}} = req;
    if (!user.username) {
        return res.status(422).json({
            error: 'username is required',
        });
    }

    if (!user.password) {
        return res.status(422).json({
            error: 'password is required',
        });
    }

    Users.findOne({username: user.username})
        .then(result => {
            if (result) {
                return res.status(422).json({
                    error: 'this username is already taken',
                });
            } else {
                const finalUser = new Users(user);

                finalUser.setPassword(user.password);

                return finalUser.save()
                    .then(() => res.json({user: finalUser.toAuthJSON()}));
            }
        });


});

router.post('/login', auth.optional, (req, res, next) => {
    const {body: {user}} = req;
    if (!user.username) {
        return res.status(422).json({
            error: 'username is required',
        });
    }

    if (!user.password) {
        return res.status(422).json({
            error: 'password is required',
        });
    }


    return passport.authenticate('local', {session: false}, (err, passportUser, info) => {
        if (err) {
            return next(err);
        }
        if (passportUser) {
            const user = passportUser;
            user.token = passportUser.generateJWT();

            return res.json({user: user.toAuthJSON()});
        }
        return res.status(400).json(info);
    })(req, res, next);
});

router.get('/current', auth.required, (req, res, next) => {
    const {payload: {id}} = req;
    return Users.findById(id)
        .then((user) => {
            if (!user) {
                return res.json({
                    error: 'asdfasdf'
                });
            }

            return res.json({user: user.toAuthJSON()});
        });
});


module.exports = router;