
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    userName: {
        type: String,
        required: true
    },
    userSurname:{
        type:String,
        required:true
    },
    userEmail:{
        type:String,
        required:true
    },
    userPasswd:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    
},{timestamps:true});

module.exports = mongoose.model('User',userSchema);