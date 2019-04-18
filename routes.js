'use strict';

var express = require('express');
var path = require("path");
var router = express.Router();
var db = require('./database/database');
var app = express();
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mooooovieticket@gmail.com',
        pass: 'Qwerty@123'
    }
});

//sign up 
router.post('/signup', function (req, res) {
    var qry ='insert into user (username,email,password,user_id) values ("' + req.body.username + '",' +
    '"' + req.body.email + '"' + ',' +
    '"' + req.body.password +'"'+ ',' +
    req.body.user_id + ');'

    db.query(qry, function (err, result) {
            if (err) throw err;

            var mailOptions = {
                from: 'mooooovieticket@gmail.com',
                to: req.body.email,
                subject: 'User Registered',
                text: 'Congratulations '+req.body.username+', you are now registered with MoviesTick.'
              };

              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                }
              });

            res.send("done");
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

//search movie
router.post('/search-movie',function(req,res){
    var qry = 'select * from movie where mname='+'"'+req.body.mname+'"'+';';
    db.query(qry,function(err,result){
        if(err) throw err;
        if(result.length>0)
        res.send(result);
    });
});

// getting movie data on book page
router.post('/book-data',function(req,res){
    var id = req.body.mid;
    var qry = 'select * from movie where mid='+id+';';
    db.query(qry,function(err,result){
        if(err) throw err;
        res.send(result);
    });
});

// load theater
router.get('/load-th',function(req,res){
    var qry = 'select * from th';
    db.query(qry,function(err,result){
        if(err) throw err;
        res.send(result);
    });
});

// get th id
router.get('/get-th-id',function(req,res){
    var qry = 'select tid from th where tname="'+req.query.tname+'";';
    db.query(qry,function(err,result){
        if(err) throw err;
        res.send(result);
    });
});

router.get('/get-seat',function(req,res){
    var qry = 'select * from seats where tid='+req.query.tid+';';
    db.query(qry,function(err,result){
        if(err) throw err;
        res.send(result);
    });
});

router.post('/book-seat',function(req,res){
    var qry = 'update seats set seats="'+req.body.seats+'" where tid='+req.body.tid+";";
    db.query(qry,function(err,result){
        if(err) throw err;
        res.send("done");
    });
});

router.post('/commit-book', function(req,res){
    var qry = 'insert into booking(tid,sid,uid,mid)'+
    ' values('+req.body.tid+','+req.body.sid+','+req.body.uid+','+req.body.mid+');';

    db.query(qry,function(err,result){
        if(err) throw err;
        res.send("Seat Booked");
    });
});

//get movie name
router.post('/get-mname',function(req,res){
    var qry = 'select * from movie where mid='+'"'+req.body.mid+'"'+';';
    db.query(qry,function(err,result){
        if(err) throw err;
        if(result.length>0)
        res.send(result);
    });
});

//get user email
router.post('/get-umail',function(req,res){
    var qry = 'select * from user where user_id='+'"'+req.body.user_id+'"'+';';
    db.query(qry,function(err,result){
        if(err) throw err;
        if(result.length>0)
        res.send(result);
    });
});

router.post('/book-mail',function(req,res){
    var mailOptions = {
        from: 'mooooovieticket@gmail.com',
        to: req.body.email,
        subject: 'Ticket Booked',
        text: 'Your ticket for movie '+req.body.mname+' in '+req.body.tname+' for seat no: '+req.body.sid+' is booked.'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          res.send("Your ticket is Booked and confirmantion is sent to "+req.body.email);
        }
      });
});
module.exports = router;