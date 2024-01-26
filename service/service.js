const express = require('express');
const User = require('../models/user_model')
const bcrypt = require('bcrypt');


exports.user_home = (req,res)=>{
    res.render('user-home')
}

exports.index_page = (req,res)=>{
    res.render('index')
}

exports.login = (req,res)=>{
    res.render('login')
}

exports.signup_err = (req,res)=>{
    res.render('signup_err')
}

exports.login_err = (req,res)=>{
    res.render('login_err')
}

exports.signin = async (req,res)=>{
    try{
        const logUser = await User.findOne({userEmail:req.body.email});
        if(logUser) {
            const validPassword = bcrypt.compareSync(req.body.passwd, logUser.userPasswd);
            
            if(validPassword){
                const isAdministrator = (logUser.isAdmin)
                if(!isAdministrator){
                    res.render('user-home',{logUser});

                }else{
                    res.render('admin-home',{logUser});
                }                
            }else{
                res.render('login_err');
            }
        }else{
            res.render('login_err');
        }
    }catch (error) {
        res.status(400).json({error});
    }
}


exports.create_task = (req,res)=>{
    res.render('create_task')
}