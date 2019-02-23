// overlapping menu
$(".navbar-toggler").on("click", function () {
    $("#navbarNav").css("height", "100%");
});
$("#navbarNav a").on("click", function () {
    $("#navbarNav").css("height", "0%");
})

// on info page, display modal automatically
if (window.location.href.indexOf("info") != -1){
	$('.modal').modal('show')
}

// activate hover effect for number of gpus info
$(document).ready(function(){
    $('[data-toggle="popover"]').popover();   
});