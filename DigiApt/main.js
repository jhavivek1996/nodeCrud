var mysql = require('mysql');
var express =  require('express');
var app = express();
var expressValidator = require('express-validator');

var http = require('http');
//console.log(expressValidator);


var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:"DigiApt"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

// app.post('/create',function(req,res){
 
//     var sql_insert="insert into register values(null,'"+req.body.first_name+"','"+req.body.last_name+"','"+req.body.email+"',"+req.body.mobile+","+req.body.dob+")";
//     connection.query(sql_insert,function(err){
//         if(err) throw err;
//         res.send('index.html',{title:'User Inserted',message:'Data Saved Successfully.'});
//     });
    
// })


/*

app.use(express.json());
app.use(express.urlencoded({extended:false}));
//app.use(expressValidator);

function isValidDate(value) {
    if (!value.match(/^\d{2}-\d{2}-\d{4}$/)) return false;
  
    const date = new Date(value);
    if (!date.getTime()) return false;
    return date.toISOString().slice(0, 10) === value;
  }

  var { check, validationResult } = require('express-validator');

app.post('/create',[
    check('firstname').isLength({min:3,max:32}),
    check('lastname').isLength({min:3,max:32}),
    check('email',"Enter valid Data").isEmail(),
    check('mobile').isLength({min:6,max:15}),
    check('dob').custom(isValidDate).withMessage('the date must be valid')
]);
*/