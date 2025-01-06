const express = require('express');
const router = express.Router();
const {register} = require('../Controllers/User.Controller');

router.route('/register').post(register);


module.exports = router;