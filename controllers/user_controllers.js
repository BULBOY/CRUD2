const User = require('../models/user_model.js');
const bcrypt = require('bcrypt');


exports.index_page = (req,res)=>{
    res.render('index')
}

exports.login_user = (req,res)=>{
    res.render('login_user')
}

exports.user_create_error = (req,res)=>{
    res.render('user_create_err')
}

exports.login_user_eroor = (req,res)=>{
    res.render('login_user_err')
}

exports.signin = async (req,res)=>{
    try{
        const logUser = await User.findOne({userEmail:req.body.email});
        if(logUser) {
            const validPassword = bcrypt.compareSync(req.body.passwd, logUser.userPasswd);
            
            if(validPassword){
                const isAdministrator = (logUser.isAdmin)
                if(!isAdministrator){
                    res.render('home',{logUser});

                }else{
                    res.render('admin_home',{logUser});
                }                
            }else{
                res.render('login_user_err');
            }
        }else{
            res.render('login_user_err');
        }
    }catch (error) {
        res.status(400).json({error});
    }
}

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

 exports.user_create = async (req,res)=>{      
    
    try{
        const user_model = new User({
        userName:req.body.name,
        userSurname:req.body.surname,
        userEmail:req.body.email,
        userPasswd:bcrypt.hashSync(req.body.passwd, 8)
        });       
    
        const existingUser = await User.findOne({userEmail:req.body.email});
        if(existingUser) {
            res.render('user_create_err');
        }else{
            const record = await user_model.save();
            res.render('index'); 
            }
        
    }catch(err){
        res.send('Error' + err)
    }   
}