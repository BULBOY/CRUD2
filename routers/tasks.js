const express = require('express');
const router = express.Router();
const controller = require('../controllers/task_controllers')

// searching all tasks with "open" satus
router.get('/api/tasks/readAll', controller.find_all_tasks)

router.get('/api/tasks/read', controller.find_open_tasks);

// finding tasks by ID

router.get('/api/tasks/read/:id', controller.findID);
 
// task updating

 router.put('/api/tasks/update/:id', controller.updateID);

 //delete task

 router.delete('/api/tasks/delete/:id', controller.deleteID);

//create task

router.post('/api/tasks/create', controller.create_task)

module.exports = router