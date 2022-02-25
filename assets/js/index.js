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

$(".edfLevelUrl").fancybox({
  overlay : {
    closeClick : true,
  }
});

$('header').load('components/header.html')
$('footer').load('components/footer.html')
//----------------------Edif--------------------------------------
$(window).on('load', function () {
  $('body').css('opacity', '1');

  $(".edf-mark").on("click touchstart" ,function () {
    const nameLevel = $(this).data("level")
    const imgurl = nameLevel.replaceAll(" ", "")
    $(this).addClass('active').siblings().removeClass("active")
    $(".edfImgLevel").attr("src",`assets/images/units/plantas/${imgurl}.png`)
    $(".edfLevelUrl").attr("href",`assets/images/units/plantas/${imgurl}.png`)
    $("#nameLevel span").text(nameLevel)
  })
  $("header .nav-link").click(function (e) {
    $("header .collapse.show").removeClass("show")
    const url = $(this).attr("href");
    if (!url.includes("html") && !url.includes("/")) {
      e.preventDefault()
      const section = $(url).offset().top;
      window.scrollTo({top: section - 65,behavior: "smooth"});
    }
  })
});
//----------------------Animations-Typologies----------------------------
$(window).scroll(function () {
  animations_tipologies_text()
  tipologies_imgA("#typologies .typologies_imgA1", "Monoambientes")
  tipologies_imgA("#typologies .typologies_imgA2", "1 Dormitorio")
})

function animations_tipologies_text(){
  const container = $('#typologies')
  const heightElement = $(container).height()
  const heightTop = $(container).offset().top;
  const scroll = $(window).scrollTop();
  if (scroll>heightTop && scroll<(heightTop + (heightElement /2 ))) {
    $('.typologies_text').css('position', 'fixed')
    if (scroll > heightTop + (heightElement / 3)) {
      $(".typologies_text").css({"top": "auto", "bottom": "0" })
    } else {
      $(".typologies_text").css({"top": "0", "bottom": "auto" })
    }
  } else {
    $('.typologies_text').css('position', 'absolute')
  }
}
function tipologies_imgA(section, text){
  const container = $(section);
  const heightTop = $(container).offset().top;
  const scroll = $(window).scrollTop();
  const heightElem = container.height();
  const move = heightTop - scroll
  if ((scroll > heightTop) && (scroll < (heightElem + heightTop))) {
    $(section).css({
      "background-attachment": "fixed",
      "background-position-y": move * .15,
    })
  } else {
    $(section).css({
      "background-attachment": "unset",
      "background-position-y": 0,
    })
  }
  if ((scroll > (heightTop - (heightElem / 2))) && (scroll < (heightTop + (heightElem / 2)))) {
    if ($(".titleTextTypology .display-5").text() != text) {
      $(".titleTextTypology .display-5").fadeOut().promise().done(function () {
        setTimeout(() => {
          $(".titleTextTypology .display-5").text(text).show()
        }, 50);
      })
    }
  }
}


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
// ------------------------------Units Gallery-----------------------------

const galleryThumbs = new Swiper('.gallery-thumbs', {
  spaceBetween: 20,
  loop: true,
  slidesPerView: 7,
  freeMode: true,
  watchSlidesVisibility: true,
  watchSlidesProgress: true,
});
const galleryTop = new Swiper('.gallery-top', {
  spaceBetween: 10,
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  thumbs: {
    swiper: galleryThumbs
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
const swipermobile = new Swiper('.swiper-mpopup', {
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
//-------------------------------- fancyBox----------------------------------

$('[data-fancybox="gallery"]').fancybox({
  animationEffect: "fade",
  arrows: true,
  infobar: false,
  buttons: ["zoom", "close"]
});

// $("#lightgallery .swiper-wrapper").lightGallery();
//---------------------------------Form-------------------------------
function dataSubmited(data) {
  const requestOptions = {
    method: 'POST',
    body: data,
    headers: {
    'Content-type': 'application/json; charset=UTF-8',
    },
  };
  fetch("https://www.infocasas.com.uy/proyectos/austin?&formulario=1&json=1", requestOptions)
  .then((json) => {
    setTimeout(()=>{
      if (json.status === 200) {
        $('#formSuccess').fadeIn();
      } else {
        $('#formError').fadeIn();
      }
      $('#formSending').hide();
    }, 2000)
  })
  .catch(error => {
    console.log('error', error);
    setTimeout(() => {
      $('#formSending').hide();
      $('#formError').fadeIn();
    }, 2000)
  });
}

function submited() {
 'use strict'
  const form = document.querySelector('#contactForm')
  const data = JSON.stringify({
    nombre: form.name.value,
    apellido: "",
    email: form.email.value,
    telefono: form.phone.value,
    tel: form.phone.value,
    source: 2,
    utm_source: "web_firenze",
    extra: form.consult.value,
    InfoLeads: 1,
    IDflow_execution: 4315
  })
  if (!form.checkValidity()) {
    event.preventDefault()
    event.stopPropagation()
  }else{
    dataSubmited(data)
    setTimeout(()=>{
      $(form).fadeOut();
      $('#formSending').fadeIn();
    },300)
  }
  form.classList.add('was-validated')
}
