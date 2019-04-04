'use strict';

//adding express modules
var express = require('express');
var app = express();
var path = require('path');
var routes = require('./routes');
var bodyParser = require('body-parser');
//using logger
var logger = require('morgan');


app.use(logger('dev'));
app.use(bodyParser.json()); //parsing json
app.use(bodyParser.urlencoded({extended:true})); //parsing form data

app.use(function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	if(req.method === "OPTIONS") {
		res.header("Access-Control-Allow-Methods", "PUT,POST,DELETE");
		return res.status(200).json({});
	}
	next();
});

//sending index.html file
app.get('/',function(req,res)
{
    res.sendFile("public/index.html",{root: path.join(__dirname)});
});

//Middlewares handle by routes module
app.use('/',routes);
//used to serve static files like css,images,js
app.use(express.static('public'));




//catch 404 and foward to error handler
//Syncronous error can be handle by express auto
app.use(function(req,res,next){
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// Error Handler
app.use(function(err,req,res,next){
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});

//Listening on port 3000
var port = 3000;

app.listen(port,function(){
    console.log('listening on '+port);
});