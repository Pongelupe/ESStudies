var app = require('./config/custom-express')();
require('./config/database')('mongodb://localhost/mean');


app.listen(3000, function() {
  console.log('Server running at 3000.');
});

module.exports = app;
