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

//TO calcullate age
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
//console.log(getAge(item.dob));




//Api to get all major details
app.get('/users/alldetails',(req, res) => {
  let data={id:req.body.id};
  console.log(data);
    let sql = "SELECT * FROM register where id=?";
    let query = conn.query(sql,data.id, (err, results) => {
      if(err) throw err;
      console.log(results);
      
      let dob=[];
      results.map((item,index ) => {
        let newDate =  new Date(item.dob);
        dob[index] =  newDate;  
        console.log(item.dob);
        //To Calculate Age
      
       res.send(JSON.stringify({"status": 200, "error": null,"response":results,"age":getAge(item.dob)}));
      });
    });
console.log("Hiiiiiii");
   

  });
   





 //Api to get single user details
  app.get('/users/details',(req, res) => {
    
    let sql = "SELECT first_name,email FROM register";
    let query = conn.query(sql,(err, results) => {
      if(err) throw err;
     res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
     console.log(results);

    });
  });
   
  
  //Api to register user
  app.post('/users/register',[check('first_name').isLength({ min: 3, max: 32 }),
                              check('last_name').isLength({min:3,max:32}).optional(),
                              check('email').isEmail().normalizeEmail().exists(),
                              check('mobile').isLength({min:6,max:15}).optional(),
                              check('dob').isISO8601({format: "^(0[1-9]|[12][0-9]|3[01])[- /.]"}).toDate()

                              ],async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      console.log(errors);
      res.status(422).json({errors:errors.array()
      })
    }
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