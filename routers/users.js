const express = require('express');
const router = express.Router();
const User = require('../models/user_model.js');

router.get('/', async (req,res)=>{
    try{
        const all_Users = await User.find();
        res.json(all_Users)
    }catch(err){
        res.send('Error' + err)
    }
});

router.post('/', async(req,res)=>{
    const user_model = new User({
        userName:req.body.name,
        userSurname:req.body.surname,
        userEmail:req.body.email,
        userPasswd:req.body.passwd
    });
    try{
        const record = await user_model.save();
        res.json(record); 
    }catch(err){
        res.send('Error' + err)
    }
});

module.exports = router