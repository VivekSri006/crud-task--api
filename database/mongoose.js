const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://127.0.0.1:27017/taskmanagerdb', {useNewUrlParser:true, useunifiedTopology: true})

.then(()=>{
    console.log("DB Successfully Connected")
})

.catch((error)=>{
    console.log("Error occurred while DB connection",error);
})

module.exports = mongoose;