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

recipes.forEach(function(d,i) {
	d.id = i;
});



var categories = [
{ "name": "Vegetables", cookierate: 0 },
{ "name": "Eggs", cookierate: 0 },
{ "name": "Chicken", cookierate: 0 },
{ "name": "Pasta", cookierate: 0 },
{ "name": "Fish", cookierate: 0 },
{ "name": "Bread", cookierate: 0 },
{ "name": "Lamb", cookierate: 1 },
{ "name": "Fruit", cookierate: 0 },
{ "name": "Beef", cookierate: 1 },
{ "name": "Cheese", cookierate: 0 },
{ "name": "Pork", cookierate: 1 },
{ "name": "Rice", cookierate: 0 },
{ "name": "Turkey", cookierate: 0 },
{ "name": "Goose", cookierate: 0 },
{ "name": "Seafood", cookierate: 0 },
{ "name": "Chocolate", cookierate: 0 },
{ "name": "Game", cookierate: 0 },
{ "name": "Duck", cookierate: 0 },
{ "name": "Avocado", cookierate: 0 },
{ "name": "Sausage", cookierate: 0 },
{ "name": "Salmon", cookierate: 0 },
{ "name": "Quinoa", cookierate: 0 },
{ "name": "Courgette", cookierate: 0 },
{ "name": "Aubergine", cookierate: 0 },
{ "name": "Couscous", cookierate: 0 },
{ "name": "Mince", cookierate: 0 },
{ "name": "Kale", cookierate: 0 },
{ "name": "Potato", cookierate: 0 },
{ "name": "Spinach", cookierate: 0 },
{ "name": "Lentil", cookierate: 0 },
{ "name": "Rhubarb", cookierate: 0 },
{ "name": "Scallops", cookierate: 0 },
{ "name": "Halloumi", cookierate: 0 },
{ "name": "Steak", cookierate: 0 },
{ "name": "Tofu", cookierate: 0 },
{ "name": "Mackerel", cookierate: 0 },
{ "name": "Mushroom", cookierate: 0 },
{ "name": "Beetroot", cookierate: 0 },
{ "name": "Leek", cookierate: 0 },
{ "name": "Cauliflower", cookierate: 0 },
{ "name": "Chorizo", cookierate: 0 },
{ "name": "Pumpkin", cookierate: 0 },
{ "name": "Asparagus", cookierate: 0 },
{ "name": "Broccoli", cookierate: 0 },
{ "name": "Tuna", cookierate: 0 },
{ "name": "Gammon", cookierate: 0 },
{ "name": "Apple", cookierate: 0 },
{ "name": "Seabass", cookierate: 0 },
];


var foods = [
	{ "name": "Apple" },
	{ "name": "Breads" },
	{ "name": "orange" }
]



app.get('/api/categories', function (req, res) {

	res.send(categories);
});


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

console.log("muncher rest server listening on port %s", port);