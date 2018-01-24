const express = require('express');
const path = require('path');
const mongoDriver = require('../modules/mongoDriver.js');
const database = require('../modules/database.js');
const router = express.Router();



mongoDriver.connect(function(response){
	if(!response.error){
		var db = response; //mongo driver

		router.get('/', function(req, res, next) {
			database.updateCounter(db, function(){
				database.showCounter(db, function(response){
					res.send("Number of website visits: " + response.visits);
				})
			})
		});

		router.get('/page2', function(req, res, next) {
		  	database.updateCounter(db, function(){
		  		res.send("Page 2 visited!")
		  	});
		});
	}
})



module.exports = router;
