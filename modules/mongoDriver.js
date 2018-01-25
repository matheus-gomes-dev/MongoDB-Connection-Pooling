var config = require('../config/config.js');
var MongoClient = require('mongodb').MongoClient;
var MONGO_URI = config.app.localhost.db;


var mongoDriver = {
	connect: function(cb){
		MongoClient.connect(MONGO_URI, function(err, db) {
			if(err){
				console.error("Error with database connection!");
				cb({error: true});
			}
			else{
				console.log("Successfully started mongoDriver!");
				db.collection('counter').count().then(function(response){
					//initialize database if no document exists in collection
					if(!response){
						var firstDocument = {description: "counter", visits: 0}
						db.collection('counter').insert(firstDocument, function(error,docsInserted){
							if(docsInserted)
								console.log("Success while initializing database!");
				            else if(error)
				            	console.log("Error while initializing database!");
				            cb(db)
						});
					}
					else{
						console.log("Database already has documents!")
						cb(db)
					}
				});
				cb(db)
			}
		});
	}
}
 
		

module.exports = mongoDriver;