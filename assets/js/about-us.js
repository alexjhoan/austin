//----------------------Edif--------------------------------------
$(window).on('load', function () {
  $('body').css('opacity', '1');
if (window.location.href.includes('about-us')) {
  $('footer').css("padding-top","60px")
  $('header .about').css("font-weight","700")
} 
});




$('header').load('components/header.html')
$('footer').load('components/footer.html')

//--------------------------------Localizar URL------------------------------
