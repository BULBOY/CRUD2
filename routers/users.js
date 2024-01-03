const express = require('express');
const router = express.Router();
const controller = require('../controllers/user_controllers')


router.get('/',controller.index_page);

router.get('/login-user',controller.login_user);

router.get('/user-create-error',controller.user_create_error);

router.get('/login-user-error',controller.login_user_eroor)

router.post('/user-login', controller.signin);


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
router.post('/api/user/create', controller.user_create);

module.exports = router