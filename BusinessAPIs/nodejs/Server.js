var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var app = express();

var triggerPy = require('./routes/python/pyFunctions.js');

var mongoRouter = require('./mongoRouter.js');


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//saved all REST APIs related to mongoDB into mongoRouter.js
//enabling routing here.
app.use('/api', mongoRouter);
app.use('/python', triggerPy);

 

var server = app.listen(6001, function() {

	var host = server.address();
	var port = server.address().port;
	
	console.log("Example app listening on http://", host, port);
});