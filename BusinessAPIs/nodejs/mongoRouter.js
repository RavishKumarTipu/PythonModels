
var express = require('express');
var mongoRouter = express.Router();
var mongodb = require('mongodb');
var mongoClient = require('mongodb').MongoClient;
var dbo;

  mongoClient.connect('mongodb://127.0.0.1:27017/', function(err, db){
	if (err) {
			console.log(err);
			return (res.send(500,err));
		}
		else {
			 dbo= db.db("MancerDB");
			
		}
  }); 




//API api/listUsers gives complete list of roleactions 
mongoRouter.get('/listUsers', function (req, res) {
		
			dbo.collection("roleactions").find({}).toArray(function(err,result) {
					if (err){
						console.log(err);
						return (res.send(500,err));
					}
					else 
					{
						console.log(result);
						return (res.send(result));
					}
			});
		}	
	  );
    
 //end of API /api/listUsers 
 
 //API /api/PostElementType.. takes data from body and saves in MongoDB MancerDB, Collection : FormElementTypes
mongoRouter.post('/PostElementType', function(req, res) {
		 
		{
			let body = req.body;
			console.log(body);
			console.log(body.id);
			delete body["_id"];
			if(req.body._id === undefined)
			//add a new row in DB
			{
				dbo.collection('ElementOptions').insertOne(body, function(err, data){
					if (err)
					{
						console.log(err);
						console.log("pos 1");
						return (res.send(500, err));
					}
					else 
					{
						console.log("pos 2");
						return(res.status(200).send({'message' : 'data well inserted'}));
					}
				});
			}
			//update existing value 
			else 
			{
				console.log("pos 3");
				console.log("type of id")  ;
				return (res.send(500, "error in validation"));
				
			}
		}

});

//Start of API /api/getElementType 
//returns all element types 
mongoRouter.get('/getElementType', function(req, res){
	dbo.collection("ElementOptions").find({}).toArray(function(err, data) {
		if (err)
		{
			console.log("inside getElementType, error occured :", err);
			res.status(500).send({'message': err});
		}
		else 
		{
			console.log("inside getElementType, data fetch success ! sending back data ", data);
			res.status(200).send(data);
		}
	});

});

//End of API /api/getElementType 

//start of API /api/deleteElementType
mongoRouter.post('/deleteElementType', function(req, res) {
	
	var _etID = new mongodb.ObjectID(req.body._id);
	console.log('inside deleteElementType data = ', req.body);
	dbo.collection('ElementOptions').deleteOne({_id : _etID}, function(err, obj) {
		if(err)
		{
			console.log('inside delete Element Type API, error : ', err);
			res.status(500).send({'success' : true, 'msg' : err});
		}
		else 
		{
			console.log('inside delete Element type, success delete for _id ', _etID);
			console.log('obj = ',obj);
			res.status(200).send({'sucess' : true, 'msg' : 'data delete success'});
		}
	
	});
});
//end of /api/PostElementType


//start of /api/postElementTypeUpdate ... would update an element type characteristics
mongoRouter.post('/postElementTypeUpdate', function(req, res) {
	var body = req.body;
	//var _etId = new mongodb.ObjectID(req.body._id);
	//body._id = _etId;
	var _etId = body._id;
	delete body["_id"];
	console.log('inside postElementTypeUpdate..',_etId, body);
	dbo.collection('ElementOptions').updateOne({'_id':_etId},{$set : body}, function(err, obj) {
		if(err)
			return(res.status(500).send({'success': false, 'msg' : err}));
		else 
		{
			console.log(obj.result);
			return(res.status(200).send({'success': true, 'msg' : 'record updated successfully !'}));
		}
	});
});


module.exports = mongoRouter;
