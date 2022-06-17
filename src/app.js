const express = require('express');
const fs = require('fs');
const sql = require('mssql');
let app = express();
let PORT = 3000;

const dbConfig = {
    server:'localhost',
    database:'Shoper9HO',
    user:'sa',
    password:'12345',
    port:1433,
    options: {
        "enableArithAbort": true,
        "encrypt":false
    }
};

app.use((req,res,next)=>{
    let method = req.method;
    let url = req.url;
    let Parameter = req.params;
    let dt = new Date();
    let log = `Url: ${url}, Method: ${method}, Parameter: ${Parameter}, Date: ${dt}`;
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

app.get("/api",(req,res)=>{
    
    var dbConn = new sql.ConnectionPool(dbConfig);
    dbConn.connect().then(function () {
        var request = new sql.Request(dbConn);
        request.query("select * from ItemMaster where StockNo='8905284146777'").then(function (data) {
            res.json(data.recordset);
            dbConn.close();
        }).catch(function (err) {
            //8.
            console.log(err);
            dbConn.close();
        });
    }).catch(function (err) {
        //9.
        console.log(err);
    });

})

app.listen(PORT,()=>{
    console.log(`Server running on the port ${PORT}`)
})