const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user_model.js');

router.get('/',(req,res)=>{
    res.render('index')
});

router.get('/login-user',(req,res)=>{
    res.render('login_user')
});

router.get('user-create-error',(req,res)=>{
    res.render('loginerr')
})

//listing all users

router.get('/api/user/read', async (req,res)=>{
    try{
        const all_Users = await User.find();
        res.json(all_Users)
    }catch(err){
        res.send('Error' + err)
    }
});

//finding user by ID

router.get('/api/user/read/:id',async (req,res)=>{
    try{
         const id_user = await User.findById(req.params.id);
         res.json(id_user);
 
    }catch(err){
         res.send('Error' + err);
    }    
 });
// user update

 router.put('/api/user/update/:id', async (req,res)=>{
    try{
        const {id} = req.params;
        const user_update = await User.findByIdAndUpdate(id, req.body);
        const uptdUser = await User.findById(id)
        res.json(uptdUser);
    }catch(err){
        res.send('Error' + err);
    }
 });

 //delete user
 router.delete('/api/user/delete/:id', async (req,res)=>{
    try{
        const {id} = req.params;
        const user_update = await User.findByIdAndDelete(id, req.body);
        if(!user_update){
            res.send('User not found')
        }
        const uptdUser = await User.findById(id)
        res.json(uptdUser);
    }catch(err){
        res.send('Error' + err);
    }
 });
// creating user
router.post('/api/user/create', async (req,res)=>{      
    
    try{
        const user_model = new User({
        userName:req.body.name,
        userSurname:req.body.surname,
        userEmail:req.body.email,
        userPasswd:bcrypt.hashSync(req.body.passwd, 8)
        });       
    
        const existingUser = await User.findOne({userEmail:req.body.email});
        if(existingUser) {
            res.render('loginerr');
        }else{
            const record = await user_model.save();
            res.render('index'); 
            }
        
    }catch(err){
        res.send('Error' + err)
    }   
});

module.exports = router