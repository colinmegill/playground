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





MongoClient.connect("never_commit_the_mongo_uri or other people will be able to use it - we will fix this soon, for now type $heroku config, paste the uri in and then delete it before making your commit", {}, function(error, db){
 
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