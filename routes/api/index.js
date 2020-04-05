const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/dialogues', require('./dialogues'));


module.exports = router;