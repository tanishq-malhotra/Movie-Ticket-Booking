'use strict';

// Connect to Database
var mysql = require('mysql')
var dbconfig = require('./database.config');

var db = mysql.createConnection(dbconfig);
db.connect(function (err) {
    if (err) {
        throw err;
    } else {
        console.log("Database Connected");
    }
});

module.exports = db;