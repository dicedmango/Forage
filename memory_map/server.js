const PORT=6660; 

var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser')

var app = express();

app.use(express.static('./'));

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

var foods = [
	{ "name": "Apple" },
	{ "name": "Breads" },
	{ "name": "orange" }
];

app.get('/api/foods', function (req, res) {

	res.send(foods);
});


server = app.listen(PORT);

var host = server.address().address
var port = server.address().port

console.log("mind map server listening on port %s", port);