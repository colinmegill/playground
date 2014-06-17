var path = require("path");
var express = require("express");
var mongo = require("mongodb");
var MongoClient = mongo.MongoClient;
var ObjectId = mongo.ObjectID;

/* creates an express server */
var app = express()
            .use(express.static(__dirname))
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

	// app.post("/resources", function(req, res){
	// 	if (err) console.log(err);
	// 	console.log("sending a resource to go into the database" + req)
	// })







});