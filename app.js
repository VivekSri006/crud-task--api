const Express = require("express");
// var bodyParser = require("body-parser");


const app = Express();
const mongoose = require('./database/mongoose')
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:true}));


// app.listen(3000, function(){
//     console.log("Server started on port 3000");
// });

app.listen(3000, () => {
    console.log("Server started on port 3000");
});

// app.get('./', (req,res)=>{
//     res.send("Hello World")
// })