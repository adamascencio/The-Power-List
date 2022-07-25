var express = require('express');
var router = express.Router();
const usersCtrl = require('../controllers/users');

// All routes begin with "/users"

// login handler for /users/login
router.get('/login', usersCtrl.login);

// register handler for /users/register

module.exports = router;