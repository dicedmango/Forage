
var $main = $( '#pt-main' ),
	$pages = $main.children( 'div.pt-page' ),
	$iterate = $( '#iterateEffects' ),
	animcursor = 1,
	pagesCount = $pages.length,
	current = 0,
	isAnimating = false,
	endCurrPage = false,
	endNextPage = false,
	animEndEventNames = {
		'WebkitAnimation' : 'webkitAnimationEnd',
		'OAnimation' : 'oAnimationEnd',
		'msAnimation' : 'MSAnimationEnd',
		'animation' : 'animationend'
	},
	// animation end event name
	animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
	// support css animations
	support = Modernizr.cssanimations;

function init() {

	$pages.each( function() {
		var $page = $( this );
		$page.data( 'originalClassList', $page.attr( 'class' ) );
	} );

	$pages.eq( 5 ).addClass( 'pt-page-current' );
}



function nextPage(options, page) {

	var animation = (options.animation) ? options.animation : options;

	var $currPage = $pages.eq( page );

	if(options.showPage){
		if( options.showPage < pagesCount - 1 ) {
			current = options.showPage;
		}
		else {
			current = 0;
		}
	}
	else{
		if( current < pagesCount - 1 ) {
			++current;
		}
		else {
			current = 0;
		}
	}

	var $nextPage = $pages.eq( current ).addClass( 'pt-page-current' ),
		outClass = '', inClass = '';

	switch( animation ) {

		case 1:
			outClass = 'pt-page-moveToLeft';
			inClass = 'pt-page-moveFromRight';
			break;
		case 2:
			outClass = 'pt-page-moveToRight';
			inClass = 'pt-page-moveFromLeft';
			break;
		case 3:
			outClass = 'pt-page-moveToTop';
			inClass = 'pt-page-moveFromBottom';
			break;
		case 4:
			outClass = 'pt-page-moveToBottom';
			inClass = 'pt-page-moveFromTop';
			break;
	}

	$currPage.addClass( outClass ).on( animEndEventName, function() {
		$currPage.off( animEndEventName );
		endCurrPage = true;
		if( endNextPage ) {
			onEndAnimation( $currPage, $nextPage );
		}
	} );

	$nextPage.addClass( inClass ).on( animEndEventName, function() {
		$nextPage.off( animEndEventName );
		endNextPage = true;
		if( endCurrPage ) {
			onEndAnimation( $currPage, $nextPage );
		}
	} );

	if( !support ) {
		onEndAnimation( $currPage, $nextPage );
	}

}

function onEndAnimation( $outpage, $inpage ) {
	endCurrPage = false;
	endNextPage = false;
	resetPage( $outpage, $inpage );
	isAnimating = false;
}

function resetPage( $outpage, $inpage ) {
	$outpage.attr( 'class', $outpage.data( 'originalClassList' ) );
	$inpage.attr( 'class', $inpage.data( 'originalClassList' ) + ' pt-page-current' );
}

init();



function goToPage(option, page) {

	nextPage(option, page);
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


function goBack() {
    window.history.back();
}

