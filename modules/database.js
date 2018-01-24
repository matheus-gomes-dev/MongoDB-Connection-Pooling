const database = {

	updateCounter: function(db, cb){
		let Counter = db.collection('counter');
		Counter.updateOne({description: "counter"},{$inc:{visits:1}}, function(error, records, status){
			if(error)
				console.log("Error while updating counter!");
			cb();
		})
	},

	showCounter: function(db, cb){
		let Counter = db.collection('counter');
		Counter.findOne({description: "counter"}, function(error, result){
			if(error){
				console.log("Database error!!");
				cb({error: true});
			}
			else{
				cb(result);
			}
		})
	}
}

module.exports = database;