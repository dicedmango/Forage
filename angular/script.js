var app = angular.module('app', ['ngRoute'])
.config( ['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', { templateUrl: 'templates/index.html', controller: 'PageCtrl' })
		.when('/login', { templateUrl: 'templates/login.html', controller: 'PageCtrl' })	
		.when('/recipe', { templateUrl: 'templates/recipe.html', controller: 'PageCtrl' })
		.when('/add', { templateUrl: 'templates/add.html' })
		.when('/search', { templateUrl: 'templates/search.html' })
		.otherwise({ redirectTo: '/', controller: 'PageCtrl' });
}]);


// CONTROLLERS

app.controller('PageCtrl', ['$scope', '$http', '$location', function($s, $http, $location) {

	console.log("page controller");

	function openMenu() {

	  $("#menu-panel").css("opacity", 1);
	  $("#menu-panel").css("z-index", 9999999999);
	  $("#menu-panel").addClass("bringToTop");
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


	function goBack() {
	    window.history.back();
	}
  
    $.get('/api/recipe?id='+getParameterByName('id'), function(data) {

      console.log("rechtfvfbchcfbnchfncncbfipes", data);

      var htmlsegment = "";

        console.log("----recipes", data[0]); 

        var dot= "";


		var bit = '<div class="icon1" >'+
		'<p class="typeic">'+ data[0].name +'</p>'+
		'<p class="typeic2">Ingredience:</p><br><br>'+
		'<p class="typeic3">' +data[0].ingredients +
		'</p><br>'+
		'<img class="imgic" src="'+ data[0].img +'"><br><br>'+
		'<p class="typeic3">' +data[0].Method +
		'<br><br><center><img class="share2" src="./img/share.png">'+
		'<img class="share1" src="./img/add2.png">'+
		'<img class="cookrer" src="./logo/sh69.png"><br><br>'+
		'<br><br><br><br><br><br><br><br><div id="line">'+


		'</div><br><br><br><br><br><br>'+
		'<br>';

		htmlsegment = htmlsegment + bit;
		$('#contence').html(htmlsegment);

    })

	function getParameterByName(name, url) {
	    if (!url) url = window.location.href;
	    name = name.replace(/[\[\]]/g, "\\$&");
	    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	        results = regex.exec(url);
	    if (!results) return null;
	    if (!results[2]) return '';
	    return decodeURIComponent(results[2].replace(/\+/g, " "));
	}

}]);