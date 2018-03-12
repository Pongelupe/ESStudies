var mongoose = require('mongoose');

var schema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
});

mongoose.model('Pokemon', schema);