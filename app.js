const express = require("express");

const app = express();
const mongoose = require('./database/mongoose')

const TaskList= require('./database/models/taskList')
const Task = require('./database/models/task');
const { application } = require("express");

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


//Endpointd to get one tasklists by tasklist ID
app.get('/tasklists/:tasklistId',(req,res)=>{
    let tasklistId = req.params.tasklistId;
    TaskList.find({ _id: tasklistId})
    .then((taskList)=>{
        res.status(200).send(taskList);
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


//Put --> To update Everything of Object63 (Pull update of Object)
app.put('/tasklists/:tasklistId',(req,res)=>{

    TaskList.findOneAndUpdate({
        _id:req.params.tasklistId
    },
    {
        $set:req.body
    })
    .then((taskList)=>{
        res.status(200).send(taskList)
    })
    .catch((error)=>{
        console.log(error)
        res.status(500)
    })
})

//Patch --> to Update of one fieldof Object
app.patch('/tasklists/:tasklistId',(req,res)=>{

    TaskList.findOneAndUpdate({
        _id:req.params.tasklistId
    },
    {
        $set:req.body
    })
    .then((taskList)=>{
        res.status(201).send(taskList)
    })
    .catch((error)=>{
        console.log(error)
        res.status(500)
    })
})

//Delete a TaskList by Id
app.delete('/tasklists/:tasklistId',(req,res)=>{

    TaskList.findByIdAndDelete(req.params.tasklistId)
    .then((taskList)=>{
        res.status(201).send(taskList)
    })
    .catch((error)=>{
        console.log(error)
        res.status(500)
    })
})



/* CRUD application for task, a task should always belong to a TaskList */
//Get all tasks for 1 TaskList, http://localhost:3000/taskslists/:tasklistId/tasks
app.get('/taskslists/:tasklistId/tasks',(req,res)=>{
    Task.find({ _taskListId : req.params.tasklistId })
    .then((tasks)=>{
        res.status(200).send(tasks)
    })
    .catch((error)=>{
        console.log(error)
        res.status(500)
    })
})

//Create a task inside a particular Task List
app.post('/taskslists/:tasklistId/tasks',(req,res)=>{
    let taskObj = { 'title': req.body.title ,'_taskListId': req.params.tasklistId };
    Task(taskObj).save()
    .then((task)=>{
        res.status(201);
        res.send(task);
    })
    .catch((error)=>{
        console.log(error); 
        res.status(500);
    })
})


// http://localhost:3000/tasklists/:tasklistId/tasks/:taskId
//Get 1 tasks for 1 TaskList, http://localhost:3000/taskslists/:tasklistId/tasks
app.get('/taskslists/:tasklistId/tasks/:taskId',(req,res)=>{
    Task.findOne({ _taskListId : req.params.tasklistId, _id:req.params.taskId })
    .then((task)=>{
        res.status(200).send(task)
    })
    .catch((error)=>{
        console.log(error)
        res.status(500)
    })
})

//Update one task belonging to one task list
app.patch('/taskslists/:tasklistId/tasks/:taskId',(req,res)=>{

    Task.findOneAndUpdate({
        _taskListId:req.params.tasklistId, _id: req.params.taskId
    },
    {
        $set:req.body
    })
    .then((task)=>{
        res.status(201).send(task)
    })
    .catch((error)=>{
        console.log(error)
        res.status(500)
    })
})


//Delete one task belonging to one task list
app.delete('/taskslists/:tasklistId/tasks/:taskId',(req,res)=>{

    Task.findOneAndDelete({
        _taskListId:req.params.tasklistId, _id: req.params.taskId
    })
    .then((task)=>{
        res.status(201).send(task)
    })
    .catch((error)=>{
        console.log(error)
        res.status(500)
    })
})


// app.listen(3000, function(){
//     console.log("Server started on port 3000");
// });

app.listen(3000, () => {
    console.log("Server started on port 3000");
});

