const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const { check,validationResult } = require('express-validator')
 
// parse application/json
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
// app.use(express.bodyParser());



 
//create database connection
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'DigiApt'
});

//connect to database
conn.connect((err) =>{
    if(err) throw err;
    console.log('Mysql Connected...');
  });
  
  let sql_insert = "INSERT INTO `users` SET ?";
 var insertUser = function(req,res){
 //console.log(req.body);
  
 data = {name:req.name,email:req.email,dob:req.dob};
console.log(data)
   
    //console.log(sql);
    let query = conn.query(sql_insert,data,(err, results)=>{

      if(err) throw err;
      
    });
  };
 




app.post('/insert-user',function(req,res){
  res.send(JSON.stringify({"user":insertUser(1,2),"status": 200, "error": null,}));

});

app.listen(5000,function(){console.log("Server started")})