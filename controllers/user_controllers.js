const User = require('../models/user_model')
const bcrypt = require('bcrypt');

exports.find = async (req,res)=>{
    try{
        const all_Users = await User.find();
        res.json(all_Users)
    }catch(err){
        res.send('Error' + err)
    }
}

exports.find_by_id = async (req,res)=>{
    try{
         const id_user = await User.findById(req.params.id);
         res.json(id_user);
 
    }catch(err){
         res.send('Error' + err);
    }    
 }

 exports.user_update = async (req,res)=>{
    try{
        const {id} = req.params;
        const user_update = await User.findByIdAndUpdate(id, req.body);
        const uptdUser = await User.findById(id)
        res.json(uptdUser);
    }catch(err){
        res.send('Error' + err);
    }
 }

 exports.user_delete = async (req,res)=>{
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
 }

 exports.signup = async (req,res)=>{      
    
    try{
        const user_model = new User({
        userName:req.body.name,
        userSurname:req.body.surname,
        userEmail:req.body.email,
        userPasswd:bcrypt.hashSync(req.body.passwd, 8)
        });       
    
        const existingUser = await User.findOne({userEmail:req.body.email});
        if(existingUser) {
            res.render('signup_err');
        }else{
            const record = await user_model.save();
            res.render('index'); 
            }
        
    }catch(err){
        res.send('Error' + err)
    }   
}