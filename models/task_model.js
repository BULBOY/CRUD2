
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({

    taskNumber: {
        type: String,
        required: true
    },
    user: {
        name:{type:String, required:true},
        email:{type:String, required:true},
        staffNumber:{type: String, required:true},
        los:{type: String, required:true}
    },
    taskType:{
        type:String,
        required:true
    },
    asset:{
        number:{type:String, required:true},
        model:{type:String, required:true}
    },
    stat:{
        type:String,
        required:true
    },
    ownedBy:{
        type:String,
        required:false,
        default:'None'
    },
    
},{timestamps:true});

module.exports = mongoose.model('Task',taskSchema);