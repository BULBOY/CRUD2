const express = require('express');
const mongoose = require('mongoose');
//const bodyParser = require('body-parser');
const url = 'mongodb+srv://hristo:214023@cluster0.odf8ikz.mongodb.net/CRUDDB?retryWrites=true&w=majority'
const morgan = require('morgan')

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
app.set("view engine", "ejs")
app.use('/public', express.static('public'))

app.use(morgan('dev'));

const tasksRoutes = require('../CRUD2/routers/tasks');
app.use('/',tasksRoutes);

const usersRoutes = require('../CRUD2/routers/users');
app.use('/',usersRoutes);

const homePage = require('../CRUD2/routers/home');
app.use('/',homePage);

app.listen(3000,(req,res)=>{
    console.log('Server starts on port 3000');
});