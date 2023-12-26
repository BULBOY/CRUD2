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

router.get('/:id',async (req,res)=>{
    try{
         const id_user = await User.findById(req.params.id);
         res.json(id_user);
 
    }catch(err){
         res.send('Error' + err);
    }    
 });
// task updating

 router.put('/:id', async (req,res)=>{
    try{
        const {id} = req.params;
        const user_update = await User.findByIdAndUpdate(id, req.body);
        const uptdUser = await User.findById(id)
        res.json(uptdUser);
    }catch(err){
        res.send('Error' + err);
    }
 });

 //delete task
 router.delete('/:id', async (req,res)=>{
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