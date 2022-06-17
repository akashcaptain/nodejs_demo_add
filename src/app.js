const express = require('express');
const fs = require('fs');
const { Date } = require('mssql');
let app = express();
let PORT = 3000;

app.use("/",(req,res,next)=>{
    let method = req.method;
    let url = req.url;
    let Parameter = req.params;
    let log = `Url: ${url}, Method: ${method}, Parameter: ${Parameter}`;
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