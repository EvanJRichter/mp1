
var sections = $( '.section' );
var navButtons = $('.navButton');

var selectedElement = $('#aboutmeNav');
var carouselImages = $('.carouselImage');
var displayedImageIndex = 0;


$(document).ready(function(){
	changeSelectedImage();
	var video = document.getElementById("videoplayer"); 
	video.removeAttribute("controls");
});
 
$(window).scroll(function (event) {
	setSelectedMenuItem();
	resizeNavBar();
});

function resizeNavBar(){
	var scrolledVal = $(document).scrollTop().valueOf();
	if (scrolledVal > $("#aboutme").height()) {
		$('.navBar').addClass('navShrink');
	} else {
		$('.navBar').removeClass('navShrink');
	}
}

function setSelectedMenuItem(){
	var scrolledVal = $(document).scrollTop().valueOf();
	var min = -1;
 	sections.each(function(index){
 		var elementTop = $(this).position().top;
 		if (scrolledVal > min && scrolledVal > elementTop - $(window).height() * 0.1){
 			min = elementTop;
 			getSelectedNavButton().removeClass('navBarHover'); //When mouse is on link, still removes hover
 			selectedElement = $(this);
 		}
 	});
 	if (selectedElement !== null){
 		getSelectedNavButton().addClass('navBarHover'); 
	}
}
function getSelectedNavButton(){
	if (selectedElement !== null){
		var navid = '#' + selectedElement.attr('id').concat('Nav');
		return $(navid);
	}
	return null;
}

//menu hovering
$('li').on("mouseenter", function(){
	//console.log($(this), getSelectedNavButton());
	if ($(this).attr('id') != getSelectedNavButton().attr('id')){
		$(this).addClass('navBarHover'); //add transition time
	}
}).on("mouseleave", function(){
	if ($(this).attr('id') != getSelectedNavButton().attr('id')){
		$(this).removeClass('navBarHover'); //add transition time
	}
});

//Smooth Scrolling
$('a').on('click', function(event) {
	var hash = this.hash;
	if (hash !== "") {
		event.preventDefault();

	$('html, body').animate({
		scrollTop: $(hash).offset().top - $(window).height() * 0.045
		}, 300, function(){
			window.location.hash = hash;
		});
	}
});

//Carousel stuff
$("#rightArrow").click(function() {
	console.log("right!");
	displayedImageIndex = (displayedImageIndex + 1) % carouselImages.length;
	changeSelectedImage();
});
$('#leftArrow').click(function() {
	if (displayedImageIndex === 0){
		displayedImageIndex = carouselImages.length - 1;
	}
	else {
		displayedImageIndex -= 1; 
	}
	changeSelectedImage();
});

function changeSelectedImage(){
	for (i = 0; i < carouselImages.length; i++){
		carouselImages.eq(i).hide();
	}
	carouselImages.eq(displayedImageIndex).show();
}

//Modal Stuff

$("#modalButton").click(function() {
  $("#myModal").show( "fast" );
});

$("#close").click(function() {
	$("#myModal").hide("fast" );
});

$("#myModal").click(function() {
  $("#myModal").hide( "fast" );
});





