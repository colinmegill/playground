var path = require("path");
var express = require("express");
var connect = require("connect");
var bodyParser = require('body-parser');
var mongo = require("mongodb");
var MongoClient = mongo.MongoClient;
var ObjectId = mongo.ObjectID;

// http://scotch.io/bar-talk/expressjs-4-0-new-features-and-upgrading-from-3-0
/* creates an express server */
var app = express()
            .use(express.static(__dirname))
            .use(bodyParser()); 							
            // .use(express.json())      // to support JSON-encoded bodies
						// .use(express.urlencoded()); // to support URL-encoded bodies



var port = process.env.PORT || 4000;
app.listen(port);
console.log("Started server on port " + port );



//to connect to my MongoClient online
//heroku config
//then add the following link 

MongoClient.connect("mongodb://heroku_app25841368:g8hhcisp1tahm5083m48fn2hfp@ds033018.mongolab.com:33018/heroku_app25841368", {}, function(error, db){
 
  // console.log will write to the heroku log which can be accessed via the 
  // command line as "heroku logs"
  db.addListener("error", function(error){
    console.log("Error connecting to MongoLab");
  });
  
  var resourcesCollection = db.collection('resources', function(err, collection){
    if (err) console.log(err)
    return collection
  });


	app.get("/resources", function(req, res){
	    console.log('get resources');
		  resourcesCollection.find().limit(50).toArray(function(err, data){ 
		    if (err) console.log(err);
		    res.json(data);
		  });
	});

	app.post("/resources", function(req, res){
		var data = req.body; 
		data.approved = false; 
		
		resourcesCollection.insert(data, {safe:true}, function(err, records){
				console.log("Record added as "+records[0]._id);
		})
	})







});