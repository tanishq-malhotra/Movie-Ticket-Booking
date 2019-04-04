'use strict';

var express = require('express');
var path = require("path");
var router = express.Router();
var db = require('./database/database');
var app = express();

//sign up 
router.post('/signup', function (req, res) {
    var qry ='insert into user (username,email,password,user_id) values ("' + req.body.username + '",' +
    '"' + req.body.email + '"' + ',' +
    '"' + req.body.password +'"'+ ',' +
    req.body.user_id + ');'
    db.query(qry, function (err, result) {
            if (err) throw err;
        res.send("submitted");
        });
});

//login
router.post('/login',function(req,res){
    var e = req.body.email;
    var p = req.body.password;
    var qry = 'select * from user where email='+ '"'+ e + '"' +';';
    db.query(qry,function(err,result){
        if(err) throw err;
       if(result.length>0)
       {
        if(result[0].email == e && result[0].password == p)
        {
            var a = result[0].user_id;
            var n = a.toString();
            res.send(n);
        }
        else res.send("error");
       }
    }); 
});

//get movie
router.get('/get-images',function(req,res){
    var qry = 'select * from movie';
    db.query(qry,function(err,result){
        if(err) throw err;
        res.send(result);
    });
});

router.post('/search-movie',function(req,res){
    var qry = 'select * from movie where mname='+'"'+req.body.mname+'"'+';';
    db.query(qry,function(err,result){
        if(err) throw err;
        if(result.length>0)
        res.send(result);
    });
});
module.exports = router;