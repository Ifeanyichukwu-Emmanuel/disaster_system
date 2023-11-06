const route = require('express').Router();

const authCont = require('../controllers/authCont');

route.post('/register', authCont.register);
route.post('/login', authCont.login);
route.get('/logout', authCont.logout);

module.exports = route;   