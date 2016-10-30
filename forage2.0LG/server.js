const PORT=8989; 

var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser')

var app = express();

app.use(express.static('./'));



app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 


var recipes = JSON.parse(fs.readFileSync('savedRecepies.json', 'utf8'));

// give all the recepies unique ID's
recipes.forEach(function(d,i) {
	d.id = i;
});


var foods = [
	{ "name": "Apple" },
	{ "name": "Breads" },
	{ "name": "orange" }
];


app.get('/api/foods', function (req, res) {

	res.send(foods);
});



app.get('/api/recipes', function (req, res) {


	res.send(recipes);
});



app.post('/api/add', function (req, res) {


	// add to list of recepies
	console.log('req.query', req.body);

	var newRecepie = {
		name: req.body.name,
		id: recipes.length,
		description: req.body.name,
		Method: req.body.method,
		Ingredients: req.body.ingredients,
		ingredients: req.body.ingredients,
		img:"http://cdn.jamieoliver.com/recipe-database/430_575/5XX_hHV_KoJAQKEJEgl8-E.jpg"
	}

	recipes.push(newRecepie);

	var json = JSON.stringify(recipes);

	fs.writeFile('savedRecepies.json', json, 'utf8', function() {
		console.log("successfully written to file");
	});

	res.send('successfully added a recepie')
});


app.get('/api/recipe', function (req, res) {

	console.log('req.query', req.query);
	res.send([recipes[req.query.id]]);
});



server = app.listen(PORT);

var host = server.address().address
var port = server.address().port

console.log("forage server listening on port %s", port);