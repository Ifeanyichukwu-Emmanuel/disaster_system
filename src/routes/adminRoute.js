const route = require('express').Router();
const adminCont = require('../controllers/adminCont');
const {auth} = require('../middlewares/authMiddlewares')


route.get('/dashboard', auth, adminCont.dashboard);
route.get('/registered-disaster', auth, adminCont.get_registerDisaster); 
route.post('/registered-disaster', auth, adminCont.register_disaster);
route.get('/report', auth, adminCont.get_report);
route.post('/delete-report', auth, adminCont.delete_report);   
route.post('/delete-disaster', auth, adminCont.delete_Disaster);   
route.get('/profile', auth, adminCont.profile); 
route.post('/update-profile', auth, adminCont.updateProfile);
route.post('/change-password', auth, adminCont.change_password); 
route.get('/login', adminCont.login);
route.get('/register', adminCont.get_register);  

module.exports = route