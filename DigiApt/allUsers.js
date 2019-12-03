var mysql = require('mysql');
var http=require('http');
var express = require('express');
var app = express();

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:"DigiApt"
});


    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      con.query("SELECT first_name,email FROM register", function (err, result) {
        if (err) throw err;
        console.log(result);
      });
    });




