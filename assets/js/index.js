$(window).on('load', function () {
  $('body').css('opacity', '1');
});

let offset

if (screen.width > 768){
  offset = 200
} else {
  offset = 0
}

new WOW({offset:offset, scrollContainer: null}).init()

$('header').load('components/header.html')
$('footer').load('components/footer.html')

// ------------------------------Locations-----------------------------
$(".list .locations_item").click(function(){
  let type = $(this).data("type")
  $(`.${type}`).addClass("active").siblings().removeClass("active")
  $(this).addClass("selector").siblings().removeClass("selector")
  });

$(".mybtn").click(function(){
  $("locations_right div").addClass("active").siblings().removeClass("selector")
});
//----------------------------------------My-Chart-----------------------------
var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'doughnut',

    // The data for our dataset
    data: {
        labels: ['Vendido', 'No Vendido'],
        datasets: [{
            label: ['14%','86%'],
            backgroundColor: ['#2a1cb7','#cecece'],
            borderColor: '#cecece',
            borderWidth: 0,
            data: [14,86],
        }]
    },

    // Configuration options go here
    options: {
      cutoutPercentage: 65,
      tooltips: false,
        legend: {
            display: false,
        }
    }
});
// ------------------------------My Modal----------------------------
$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
})
// ----------Swipper Modal-----------------
const swiperpopup = new Swiper('.swiper-popup', {
	loop: true,
	navigation: {
  	nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
// ----------Swipper Mobile-----------------
// var stypology = new Swiper('.swiper-typ', {
//   loop: true,
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },
// });
//-------------------------------- fancyBox----------------------------------

$('[data-fancybox="gallery"]').fancybox({
  animationEffect: "fade",
  arrows: true,
  infobar: false,
  buttons: ["zoom", "close"]
})

// $("#lightgallery .swiper-wrapper").lightGallery();