
var express = require('express');
var triggerPy = express.Router();
var {PythonShell} = require('python-shell');   
PythonShell.defaultPythonPath = "Python";
			
//triggering code API, returns results
triggerPy.post('/triggerPy', function(req, res) {
	var os = require('os');	
	var strPath = req.body.path;
	var msg = 'result==>';
	var errdetails = '';
	
		let pyshell = new PythonShell(strPath);
		pyshell.on('message', function(message) {
			msg += os.EOL  + message  ;
			console.log('in message', msg);
		});
		pyshell.receiveStderr('', function(data) {
				msg +=  os.EOL +     data;
				console.log('in receiveStderr', msg);
		});
		pyshell.end(function(err, code, signal) {
			if (err)
			{
				console.log('in end function, error', msg);
				console.log('error :: ', err);
				if(err.traceback != null)
					errdetails += os.EOL + err.traceback;
				if(err.Error != null)
					errdetails += os.EOL + err.Error;
				if(err != null)
					errdetails +=  os.EOL +  err;
				
				  
				return (res.status(200).send([{'success': false, 'msg' : errdetails}, null]));
			}
			console.log('all successful', msg);
			return res.status(200).send([{'success' : true, 'msg':msg},fetchAllImages('.//py//results//') ]);
		});
	 	
});	
	 
//fetching all python models available to use 
triggerPy.get('/fetchModels', function(req, res) {
	var results = [];
	var myFolder = './/py/models//';
	var fs = require('fs');
	
	
	fs.readdirSync(myFolder).forEach(function(file) {
		var data;	
		console.log('files',file);
		data = fs.readFileSync(myFolder + file);
		console.log('inside readFile :', data.toString());
		results.push({'name' : file, 'path': myFolder + file, 'code' : data.toString(), 'arguments' : null});
		 
 	});
	console.log('inside fetchmodels', results);
	return res.status(200).send(results);
});


//saving new py model, check for name, if black, then add new python file, using YYYYMMDDHHMMSS.py
//else save it
triggerPy.post('/savePy', function(req, res) {
	var fs = require('fs');
	var dateFormat = require('dateformat');
	var strPath = '';
	var myFolder = './/py//models//';
	var fileName = '';
	var code = '';
	if (req.body.name === '')
	{
		fileName = dateFormat(new Date(), 'yyyy_mm_dd_hh_MM_ss');
		strPath = myFolder + fileName  + '.py';
	}
	else 
	{
		fileName = req.body.name;
		strPath = req.body.path;
 	}
	code = req.body.code;
	console.log('file path =', strPath);
	var saved = fs.writeFileSync(strPath, code);
	if(saved === false)
			return res.status(500).send({'done' : 'Not Ok'});
	else 
		return res.status(200).send({'name' : fileName, 'path': strPath, 'code': code , 'arguments': null});
 });

 
///a GET api to read images from web server, this could be bound to a control on client end
triggerPy.get('/getImage/:image', function(req, res) {
	console.log('############ inside getimages ##########');
	var path = require('path');
 	var pathToImage =    './/py//results//'+ req.params.image;
	var absPath = path.resolve(pathToImage);
 	res.sendFile(absPath);
});

//********
//*********helper function area
 function fetchAllImages(imgPath)
 {
	 var results = [];
	 var fs = require('fs');
	 
	 fs.readdirSync(imgPath).forEach(function(file) {
		
		console.log(file);
		results.push(file);
	 });
	 return(results);
 }

module.exports =  	triggerPy;
 