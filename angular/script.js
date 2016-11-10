// regular js

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


    function search() {

      var matchString = $("#text2343434345").val();


      var data = _.filter(recepies, function(recpie) {

            var re = new RegExp(matchString,"g");

            console.log(recpie)

            if(recpie.Method.match(re)) return true;
            if(recpie.description.match(re)) return true;
            if(recpie.ingredients.match(re)) return true;
            if(recpie.name.match(re)) return true;
      })


          if(data.length == 1) {
            window.location.href = "/rec.html?id=" + data[0].id;
          }

          console.log("change", matchString, data);
          //drawResults(data);

    }









    function showRecepie(id) {
      console.log("show recipes", id);
    }






  
    $.get('/api/recipes', function(data) {

        drawResults(data);
    })

function drawResults(data) {
      console.log("recipes", data);


      recepies = data;

      console.log("this is what I got from the server for dropdown", data);
      
      var options = '';

      for(var i = 0; i < data.length; i++) {  
        options += '<option value="'+data[i].name+'"" />';
      }


      $('#categories').html(options)







      $('#contence').html("");

      var htmlsegment = "";
      var resultsPerPage = 5;

      numberOfpages = Math.floor(data.length / resultsPerPage);
      console.log("number of pages", numberOfpages)

      var startPos = page * resultsPerPage;

      for(var i = startPos; i < (startPos + resultsPerPage); i++) {  

        var dot= "";

        if (data[i].name.length > 22) dot = "... <a class='read-more' href='/rec.html?id="+data[i].id+"'>Read More</a>";

            var bit = 

            '<img class="imgic238" src="'+ data[i].img +'"><br>'+
            '<div class="hizz"><img class="share2" src="./img/share.png">'+
            '<img class="share1" src="./img/add2.png">'+
            '<div class="icon1" >'+
            '<a href="/rec.html?id='+data[i].id+'">'+
            '<center><p class="typeic">'+ data[i].name +'</p>'+
            '<p class="typeic2">Ingredience:</p>'+
            '<p class="typeic3">' +data[i].ingredients.substr(0,500)+ dot +
            '</p><br>'+
            '<img class="cookr" src="./logo/sh69.png"></div>'+
            
            '</a>'+

            '</div>'+
            '<br><br><br><br>';


            htmlsegment = htmlsegment + bit;



      }

      $('#contence').html(htmlsegment);




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


var page = 1;

if(!QueryString.page) { 

  insertParam("page", page); 

} else {

  page = parseInt(QueryString.page);

}

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



console.log(_);    

var numberOfpages = 0;
var recepies = [];































// Angular JS

var app = angular.module('app', ['ngRoute'])
.config( ['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', { templateUrl: 'templates/index.html', controller: 'PageCtrl' })
		.when('/login', { templateUrl: 'templates/login.html', controller: 'PageCtrl' })	
		.when('/recipe', { templateUrl: 'templates/recipe.html', controller: 'PageCtrl' })
		.when('/add', { templateUrl: 'templates/add.html' })
		.when('/about', { templateUrl: 'templates/about.html' })
		.when('/search', { templateUrl: 'templates/search.html' })
		.when('/cookies', { templateUrl: 'templates/cookies.html' })
		.otherwise({ redirectTo: '/', controller: 'PageCtrl' });
}]);


// CONTROLLERS

app.controller('PageCtrl', ['$scope', '$http', '$location', function($s, $http, $location) {

	console.log("page controller");
	closeMenu();

	setTimeout(function() {
	  $("#menu-panel").removeClass("startInvisible"); 
	}, 1750)

	var numberOfpages = 0;
	var recepies = [];


  
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

}]);