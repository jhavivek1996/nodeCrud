// var db=require('./database');
var bodyParser = require('body-parser');
var express = require("express");
var bodyParser = require('body-parser');
var app = express();
var mysql = require('mysql');
var cors = require('cors');
var jwt = require('jsonwebtoken');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'DigiApt'
});

//connect to database
conn.connect((err) => {
  if (err) throw err;
  console.log('Mysql Connected at 4000');
});



app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
var router = express.Router();

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}

// const verifyToken =function(req,res,next){
//   //Get Header Value
//   const bearerHeader = req.headers['authorization'];

//   if(typeof bearerHeader !== 'undefined'){
//     const bearer = bearerHeader.split('');
//     const bearerToken = bearer[1];

//     req.token = bearerToken;

//           // Next is a middleware
//     next();
//   }else{
//     res.sendStatus(403);
//   }
// }




// app.post('/sendToken',verifyToken,(req,res)=>{
//   res.json({
//     name:"Vivek Jha",
//   });
// });

// app.post('/login',(req,res)=>{
//   const user={
//     message : "I am a json web token"
//   };

//   jwt.sign({user},"secretkey",(err,token)=>{
//     res.json({token});
//   });
//   });


app.get('/name', function (req, res) {

  res.send("Hiii Vivek");
});


app.post('/register', cors(corsOptions), function (req, res) {
  console.log(req.body);

  let sql = "INSERT INTO register SET ?";
  let query = conn.query(sql, req.body, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({
      "status": 200,
      "error": null,
      "response": results
    })
    );

  });
});

app.get('/show', cors(corsOptions), function (req, res) {
  let data = { id: req.body.id };
  //console.log(req.body);
  let sql = "SELECT * FROM register WHERE id = ?";
  let query = conn.query(sql, data.id, (err, results) => {

    if (err) throw err;
    console.log(results);
    res.json({ results });
  })
});

app.get('/showall', cors(corsOptions), function (req, res) {

  //console.log(req.body);
  let sql = "SELECT * FROM register";
  let query = conn.query(sql, (err, results) => {

    if (err) throw err;
    console.log(results);
    res.send(JSON.stringify({ results }));
  })
});

app.put('/delete', cors(corsOptions), function (req, res) {
  let data = { id: req.body.id };
  //console.log(req.body);
  let sql = "DELETE FROM register WHERE id = ?";
  let query = conn.query(sql, data.id, (err, results) => {

    if (err) throw err;
    console.log(data);
    res.send({ "output": data.id });
  })
});

app.put('/update', cors(corsOptions), function (req, res) {

  let data = [req.body.first_name, req.body.last_name, req.body.email, req.body.mobile, req.body.id];
  //console.log(req.body);
  let sql = "UPDATE register SET first_name = ?,last_name = ?, email = ?, mobile = ? WHERE id=?";
  let query = conn.query(sql, data, (err, results, fields) => {

    if (err) throw err;
    console.log(data);
    res.end(JSON.stringify(results));
  })
});


app.listen(4000);
