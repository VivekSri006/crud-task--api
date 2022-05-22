const express = require("express");

const app = express();
const mongoose = require('./database/mongoose')

const TaskList= require('./database/models/taskList')
const Task = require('./database/models/task')

//Example of Middleware

/*
CORS - Cross Origin Request Security
Backend -  http://localhost:3000
Frontend - http://localhost:4200
*/

// 3rd party library, app.use(cors());
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Pass to next layer of middleware
    next();
});

app.use(express.json()); // or 3rd party body parser

//Routes of REST API Endpoints or webservices
/*
TaskList - Create, Update, ReadTaskListById, ReadAllTaskList
Task - Create, Update, ReadTaskById, ReadAllTask
*/

//Routes or API Endpoints for TaskList models
// Get All Task List
// http://localhost:3000/tasklists  =>[ {Tasklist}, {Tasklist} ]

// app.get('/tasklists', function(req,res){
//     TaskList.find({})
//     .then( function(lists){
//         res.send(lists)
//     })
//     .catch((error)=>{
//         console.log(error)
//     })
// })


app.get('/tasklists',(req,res)=>{
    TaskList.find({})
    .then((lists)=>{
        res.status(200);
        res.send(lists);
    })
    .catch((error)=>{
        console.log(error);
        res.status(500);
    })
})


// Routes or Endpoints for creating a tasklist

app.post('/tasklists',(req,res)=>{

    console.log(req.body);


    let taskListObj = { 'title': req.body.title };
    TaskList(taskListObj).save()
    .then((lists)=>{
        res.status(201);
        res.send(lists);
    })
    .catch((error)=>{
        console.log(error);
        res.status(500);
    })
})


// app.listen(3000, function(){
//     console.log("Server started on port 3000");
// });

app.listen(3000, () => {
    console.log("Server started on port 3000");
});

