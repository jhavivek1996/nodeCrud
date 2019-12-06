const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const { check,validationResult } = require('express-validator')
 
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
  console.log('Mysql Connected...');
});


app.post('/users/register',async (req, res) => {
   // const errors = validationResult(req);
    console.log(req.body);
    
    let data = {first_name: req.body.first_name, last_name: req.body.last_name,email:req.body.email,mobile:req.body.mobile,dob:req.body.dob};
    let sql = "INSERT INTO register SET ?";
    let query = conn.query(sql, data,(err, results) => {
      if(err) throw err;
       res.send(JSON.stringify({"status": 200, "error": null, "response": results}));

    
    });
  });

   
  //Server listening
  app.listen(4000,() =>{
    console.log('Server started on port 4000...');
  });