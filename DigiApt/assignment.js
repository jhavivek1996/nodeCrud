const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');

 
// parse application/json
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended:false}));


 
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
//   console.log('Assignment Connected...');
});

var getuserdetails=function(uid)
{
    let sql = "SELECT first_name FROM register where id="+uid;
    let query=conn.query(sql,(err,results)=>{
        if(err) throw err;
        //console.log(results);
    });
};

var user=getuserdetails(1);
console.log(user);

var getAge= function (DOB)
{
var today = new Date();
var birthDate = new Date(DOB);
var age = today.getFullYear() - birthDate.getFullYear();
var m = today.getMonth() - birthDate.getMonth();
if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
 {
    age = age - 1;
  }
return age;

  }  

var final_age=getAge("1996/11/21");
console.log("age :"+final_age);