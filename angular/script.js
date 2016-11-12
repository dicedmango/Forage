// regular js


function goBack() {
    window.history.back();
}

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

var numberOfpages = 0;
var recepies = [];




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



function showRecepie(id) {
  console.log("show recipes", id);
}



var QueryString = function () {
  // This function is anonymous, is executed immediately and 
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  } 
  return query_string;
}();



// pagination
function nextPage() {

  if(page == numberOfpages) return;

  page = page + 1;
  console.log("next", page);
  insertParam("page", page);
}

// pagination
function prevPage() {

  if(page == 0) return;

  page = page - 1;
  console.log("prev", page);
  insertParam("page", page);  
}


function insertParam(key, value)
{
    key = encodeURI(key); value = encodeURI(value);

    var kvp = document.location.search.substr(1).split('&');

    var i=kvp.length; var x; while(i--) 
    {
        x = kvp[i].split('=');

        if (x[0]==key)
        {
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

var numberOfpages = 0;
var recepies = [];




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
		.when('/duk', { templateUrl: 'templates/duk.html' })
		.otherwise({ redirectTo: '/' });
}]);


// CONTROLLERS

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