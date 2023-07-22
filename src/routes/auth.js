const express = require('express');
const route = express.Router();
const authController = require('../app/controllers/AuthController');

route.get('/', authController.login);
route.get('/home', authController.home);

//Login
route.post('/home', authController.goLogin);
//Register
route.get('/register', authController.register);          
route.post('/create', authController.create);    
//Logout
route.get('/logout', authController.logout);      

module.exports = route;