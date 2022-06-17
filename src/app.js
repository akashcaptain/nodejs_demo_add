const express = require('express');
const fs = require('fs');
const sql = require('mssql');
let app = express();
let PORT = 3000;

app.use("/",(req,res,next)=>{
    let method = req.method;
    let url = req.url;
    let Parameter = req.params;
    let dt = new Date();
    let log = `Url: ${url}, Method: ${method}, Parameter: ${Parameter}, Date: ${dt}`;
    console.log(dt);
    fs.appendFile("request_log.txt", log + "\n", err =>{
        if(err){
            console.log(err);
        }
    })
    next();
})

app.get("/",(req,res)=>{
    res.send("Get Method");
})

app.listen(PORT,()=>{
    console.log(`Server running on the port ${PORT}`)
})