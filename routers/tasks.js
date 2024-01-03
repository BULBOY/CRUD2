const express = require('express');
const router = express.Router();
const Task = require('../models/task_model.js');

router.get('/api/tasks/read', async (req,res)=>{
   try{
        const all_tasks = await Task.find({stat:"open"});
        //res.render('home',{tasks:all_tasks});
        res.render('all_tasks',{data:all_tasks})

   }catch(err){
        res.send('Error' + err);
   }    
});

router.get('/api/tasks/read/:id',async (req,res)=>{
    try{
         const id_task = await Task.findById(req.params.id);
         console.log(id_task)
         res.json(id_task);
 
    }catch(err){
         res.send('Error' + err);
    }    
 });
 
// task updating

 router.put('/api/tasks/update/:id', async (req,res)=>{
    try{
        const {id} = req.params;
        const task_update = await Task.findByIdAndUpdate(id, req.body);
        const uptdTask = await Task.findById(id)
        res.json(uptdTask);
    }catch(err){
        res.send('Error' + err);
    }
 });

 //delete task

 router.delete('/api/tasks/delete/:id', async (req,res)=>{
    try{
        const {id} = req.params;
        const task_update = await Task.findByIdAndDelete(id, req.body);
        if(!task_update){
            res.send('Task not found')
        }
        const uptdTask = await Task.findById(id)
        res.json(uptdTask);
    }catch(err){
        res.send('Error' + err);
    }
 });

//create task

router.post('/api/tasks/create', async (req,res)=>{
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

router.get('task_update',(req,res)=>{
    
})

module.exports = router