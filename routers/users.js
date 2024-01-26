const express = require('express');
const router = express.Router();
const controller = require('../controllers/user_controllers');
const service = require('../service/service')


router.get('/user-home',service.user_home);

router.get('/',service.index_page);

router.get('/login-user',service.login);

router.get('/signup_err',service.signup_err);

router.get('/login_err',service.login_err)

router.post('/signin', service.signin);


//API

//listing all users

router.get('/api/user/read', controller.find);

//finding user by ID

router.get('/api/user/read/:id', controller.find_by_id);

// user update
router.put('/api/user/update/:id', controller.user_update);

 //delete user
router.delete('/api/user/delete/:id', controller.user_delete);

// creating user
router.post('/api/user/create', controller.signup);

module.exports = router