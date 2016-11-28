function goBack() { window.history.back(); }

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function selectFromMenu() {
  console.log("menu item", this);
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#blah')
                .attr('src', e.target.result)
                .width(150)
                .height(200);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function closeMenu() {

  console.log("close menu");

  $("#menu-panel").css("opacity", 0);
  $("#menu-panel").css("z-index", 0);
  $("#menu-panel").removeClass("bringToTop");
}

closeMenu();

setTimeout(function() {
  $("#menu-panel").removeClass("startInvisible"); 
}, 1750)

function sendRecipe() {

	var name = $("#text5").val();
	var Ingredients = $("#text7").val();
	var method = $("#text6").val();
	var inputIMG =  $('#file-input').prop('files');

	console.log(inputIMG);

	inputIMG = JSON.toString(inputIMG);

	$.post( "/api/add", {
	 name: name,
	 ingredients: Ingredients,
	 method: method

	}, function() {
	  window.location.href = "/cookies.html";
	});

	console.log("sendRecipe", name, Ingredients, method);
}

var QueryString = function () {
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if (typeof query_string[pair[0]] === "undefined") { // If first entry with this name
      query_string[pair[0]] = decodeURIComponent(pair[1]);
    } else if (typeof query_string[pair[0]] === "string") { // If second entry with this name
      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
      query_string[pair[0]] = arr; // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  } 
  return query_string;
}();

function insertParam(key, value){
    key = encodeURI(key); value = encodeURI(value);
    var kvp = document.location.search.substr(1).split('&');
    var i=kvp.length; var x; while(i--) {
        x = kvp[i].split('=');

        if (x[0]==key) {
            x[1] = value;
            kvp[i] = x.join('=');
            break;
        }
    }
    if(i<0) {kvp[kvp.length] = [key,value].join('=');}
    //this will reload the page, it's likely better to store this until finished
    document.location.search = kvp.join('&'); 
}


function openMenu() {
  $("#menu-panel").css("opacity", 1);
  $("#menu-panel").css("z-index", 9999999999);
  $("#menu-panel").addClass("bringToTop");
}


// Angular JS

var app = angular.module('app', ['ngRoute', 'ngAnimate'])
.config( ['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', { templateUrl: 'templates/index.html' })
		.when('/login', { templateUrl: 'templates/login.html', controller: 'LoginCtrl' })	
		.when('/rate', { templateUrl: 'templates/rate.html' })
		.when('/recipe', { templateUrl: 'templates/recipe.html', controller: 'RecipeCtrl' })
		.when('/rec', { redirectTo: '/recipe' })
		.when('/add', { templateUrl: 'templates/add.html' })
		.when('/about', { templateUrl: 'templates/about.html' })
		.when('/search', { templateUrl: 'templates/search.html', controller: 'SearchCtrl' })
		.when('/cookies', { templateUrl: 'templates/cookies.html', controller: 'CookieCtrl' })
		.when('/duk', { templateUrl: 'templates/duk.html', controller: 'DUKCtrl' })
		.when('/user', { templateUrl: 'templates/user.html', controller: 'UserCtrl' })
		.otherwise({ redirectTo: '/' });
}]);


// CONTROLLERS

app.controller('DUKCtrl', ['$scope', '$http', '$location', function($s, $http, $location) {

	$s.pageClass = 'duk-page';
	$s.duks = [
		{ 
			top: "26% of all vegetables grown are destroyed before they even reach the shops.",
			bottom: "Embrace wonky fruit and vegetables, they still have as many nutrience and are just as tasty as perfectly shaped produce even though they are ugly. 6 Billion Pounds Of Perfectly Edible Produce Is Wasted Every Year, Simply Because It's Ugly."
		}
		,
		{ 
			top: "Write it down and you are much more likely to stick to it!",
			bottom: "Write a shopping list by checking your cupboards, fridge and freezer before you set off. This will help you know what you need and help you avoid from purchasing unnecessary products. Hopefully this will help you dismiss those seductive deals presented by the supermarkets and keeping you within your budget."
		}
		,
		{ 
			top: "The Difference Between Best Before & Used By",
			bottom: "Use by date is about safety and the most important date to remember! Foods can be eaten (and most can be frozen) up until the use by date, but not after. Best before date is about quality Best before date is about quality and not safety. The food will be safe to eat after this date but may not be at its best."
		}
		,
		{ 
			top: "1/3 of the food around the world dose not get eaten?",
			bottom: "Be more open minded about how you buy and eat food. Try more unusual cuts of meat or buy sustainable whole fish and use the leftover bones and head to make a delicious stock."
		}
		,
		{ 
			top: "The Uk food industry wastes 10 million tones of food each year",
			bottom: "Waste research company; WRAP estimates that 270,000 tonnes of discarded food could be suitable for redistribution. Currently only 47 tonnes of waste food finds its way to charity."
		}
		,
		{ 
			top: "Look Out For Pulled Eggs",
			bottom: "These small eggs from young hens are not large enough to meet supermarkets criteria, so they are often wasted. In truth, they are the best quality egg you can buy, so keep an eye out for them on sites, such as themacsfarm.co.uk"
		},
		{ 
			top: "American wastes 40% of their food amounting to $165 Billion Dollars straight in the trash",
			bottom: "As food waste figures pile up, so do the number of people in the UK relying on Food Banks. 1,109,309 Three day emergency food supply packs are being given out over 2016."
		},
		{ 
			top: "Portion Out Your Food!",
			bottom: "Weigh out foods such as rice, pasta and vegetables so you don't end up cooking too much and throwing it away."
		},
		{ 
			top: "Embrace Leftovers",
			bottom: "Portion out leftovers into freezer bags, label and date them, then pop them in the freezer ready for a quick weekday supper."
		},
		{ 
			top: "The average family in Britain throws away £680 worth of food per year.",
			bottom: "32% of bread in the UK. gets thrown away, reuse stale bread. You can ransform stale bread, just sprinkle with water, then pop briefly in a warm oven. You can also make plenty of recipies using stale bread or feed it to the birds."
		},
		{ 
			top: "Grow your own food!",
			bottom: "Growing fruits and vegetables seems overwhelming to most of us, but it is much simpler than it sounds. Plus you do not have to trade in your urban lifestyle for a life in the sticks for self sufficiency. All you need is a few square feet outside, a water source, and a little time."
		},
		{ 
			top: "French Law Forbids Food Waste By Supermarkets",
			bottom: "France has became the first country in the world to ban supermarkets from throwing away or destroying food, forcing them to donate instead. Anti poverty protesters helped bring this law forward. The fact that France has done this means that there is no reason any other country should not enforce this law."
		}
	];

	$s.duk = $s.duks[Math.floor(Math.random() * $s.duks.length)];

	console.log("$s.duks", $s.duks);

}]);

app.controller('UserCtrl', ['$scope', '$http', '$location', function($s, $http, $location) {

	$s.pageClass = 'user-page';
	console.log("user controller");

	$s.userDetails;

	// get user details from username
    $.get('/api/user?username='+getParameterByName('username'), function(data) {

		console.log("user", data);
		$s.userDetails = data;
		window.setTimeout(function(){ $s.$apply(), 100 });
    });


}]);


app.controller('LoginCtrl', ['$scope', '$http', '$location', function($s, $http, $location) {

	$s.pageClass = 'login-page';

}]);

app.controller('SearchCtrl', ['$scope', '$http', '$location', function($s, $http, $location) {

	$s.pageClass = 'search-page';

}]);


app.controller('RecipeCtrl', ['$scope', '$http', '$location', function($s, $http, $location) {

	$s.pageClass = 'recipe-page';
	$s.currentRecepie = {};


    $.get('/api/recipe?id='+getParameterByName('id'), function(data) {

		console.log("recipe", data);
		if(!data || !data[0] || data.length == 0) return;

		$s.currentRecepie = data[0];

		setTimeout(function() { $s.$apply() }, 50);
    });

}]);

app.controller('CookieCtrl', ['$scope', '$http', '$location', function($s, $http, $location) {

	$s.pageClass = 'cookies-page';

}]);

app.controller('PageCtrl', ['$scope', '$http', '$location', function($s, $http, $location) {

	$s.allRecipes = [];
	$s.filteredRecipes = [];
	$s.users = [];

  	$.get('/api/users', function(data) {

	    $s.users = data;
	    console.log("$s.users", $s.users);
	});

  	$.get('/api/recipes', function(data) {

	    $s.allRecipes = data;
	    console.log("$s.allRecipes", $s.allRecipes);
	});




    $s.searchtext = "";

    $s.$watch("searchtext", function(n, o) {
		
		$s.filteredRecipes = _.filter($s.allRecipes, function(recipe) {

			var reg = new RegExp(n);

			return recipe.name.match(reg);

		})

		console.log("searchtext change", n, $s.filteredRecipes);
    });

}]);