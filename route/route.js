const express = require('express');
const route = express();
const bcrypt = require('bcrypt');
const controller = require('../controller/controller');
const poster = require('../middleweres/uploads');
const userpath = require('../middleweres/uploads');


route.get('/', controller.defaultpath);

route.get('/logOut', controller.logOut);
route.get('/signInpage', controller.signInpage);
route.post('/register_2', controller.register)
route.post('/signin', controller.signIn)
route.get('/register', controller.login)
route.get('/log_on', controller.log_on)
route.get('/signup', controller.signup)

route.get('/home', controller.backTo)

route.post('/appDoc', poster.single('poster'), controller.appDoc);
route.get('/deleteDoc/:id', controller.deleteDoc);
route.get('/blog', controller.blog);
route.get('/view', controller.view);
route.get('/editDoc/:id', controller.editDoc);
route.post('/updateDoc', poster.single('poster'), controller.updateDoc);

route.get('/changepass', controller.changepass)
route.post('/updatepass' , controller.updatepass)

route.get('/profile', controller.profile)
// route.get('/profileData', controller.profiledata)
// route.get('/editProfile', controller.editProfile)
route.post('/addProfile', poster.single('profileImg'), controller.addProfile)


route.get('/forgot', controller.forgot)
route.post('/forgotpass', controller.forgotPass)
route.get('/otpForm/:token', controller.otpForm)
route.get('/newUserPassword', controller.newUserPassword)
route.post('/verifyOtp', controller.verifyOtp)
route.post('/updateUserpassword', controller.updateUserpassword)



module.exports = route;