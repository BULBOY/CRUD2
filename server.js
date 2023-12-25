const express = require('express');
const mongoose = require('mongoose');
//const bodyParser = require('body-parser');
const url = 'mongodb+srv://hristo:214023@cluster0.odf8ikz.mongodb.net/CRUDDB?retryWrites=true&w=majority'
//const url = 'mongodb://localhost/TestDB'

const app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect(url)
const con = mongoose.connection;

con.on('open',(req,res)=>{
    console.log('Connected ...');
});

app.use(express.json());
app.use(express.urlencoded({extended:false}))

const tasksRoutes = require('../CRUD2/routers/tasks');
app.use('/tasks',tasksRoutes);

const usersRoutes = require('../CRUD2/routers/users');
app.use('/users',usersRoutes);

app.listen(3000,(req,res)=>{
    console.log('Server starts on port 3000');
});