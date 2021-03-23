const { Router } = require('express');
const authController = require('../controllers/auth');
const route = Router();

// test passport js lib
route.post('/login', authController.postLogin);
route.post('/register', authController.postRegister);
module.exports = route;
