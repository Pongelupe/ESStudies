module.exports = function(uri) {

	var mongoose = require('mongoose');

	mongoose.connect(uri);

	mongoose.connection.on('connected', function() {
		console.log('Mongo is up')
	});

	mongoose.connection.on('error', function(error) {
		console.log('Error: ' + error);
	});	

	process.on('SIGINT', function() {
		mongoose.connection.close(function() {
			console.log("App closed, Mongo's connection is closed");
			process.exit(0);
		});
		
	})
};
