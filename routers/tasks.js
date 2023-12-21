const express = require('express');
const router = express.Router();
const Task = require('../models/task_model.js');

router.get('/',async (req,res)=>{
   try{
        const all_tasks = await Task.find();
        res.json(all_tasks);

   }catch(err){
        res.send('Error' + err);
   }    
});

router.get('/:id',async (req,res)=>{
    try{
         const id_task = await Task.findById(req.params.id);
         res.json(id_task);
 
    }catch(err){
         res.send('Error' + err);
    }    
 });


router.post('/', async (req,res)=>{
    const task_model = new Task ({
        "taskNumber": req.body.number,
        "user.name": req.body.name,
        "user.email": req.body.email,
        "user.staffNumber": req.body.stnumber,
        "user.los": req.body.los,
        "taskType": req.body.type,
        "asset.number": req.body.asset,
        "asset.model": req.body.model,
        "stat": req.body.status,
        "ownedBy": req.body.owner
    });

    try{
        const record = await task_model.save();
        res.json(record);
    }catch(err){
        res.send('Error ' + err)
    }
});


module.exports = router