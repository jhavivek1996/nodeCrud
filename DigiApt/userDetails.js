var mysql = require('mysql');
var http=require('http');
var express = require('express');
var app = express();
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:"DigiApt"
});


con.connect(function(err,req,res) {
    console.log(req.body);
  if (err) throw err;
  console.log("Connected!");
        var sql_ins = "SELECT * from register";
        con.query(sql_ins,function(err,result){
        if (err) throw err;
        console.log(result);
        
        function calculateAge(day, month,year ) {
            var currentDate = new Date();
            
            var currentMonth = currentDate.getUTCMonth() + 1;
            var currentYear = currentDate.getFullYear();
            var currentDay = currentDate.getUTCDate();
            var age = currentYear - year;
            if (currentMonth > month) {
                return age;
            } else {
                if (currentDay >= day) {
                    return age;
                } else {
                    age--;
                    return age;
                }
            }
        }
          
        for(var i=0;i<=2;i++){

            console.log(calculateAge(new Date(result['1']['dob'])));
        }
      

  });
  });

