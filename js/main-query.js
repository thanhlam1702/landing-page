// jquery file

// toggle language 
$('.language__current').click(function (e) {
    e.stopPropagation();
    $('.language__list').toggleClass('active')
    $('.language__btn').toggleClass('click')

});

$(document).click(function (e) {
    e.preventDefault();
    $('.language__list').removeClass('active')
    $('.language__btn').removeClass('click')

});

// scroll header and show btn back to top when scroll to limit 
let prevScroll = window.pageYOffset;
$(window).scroll(function () {
    let heightLimit = $('.slider')[0].clientHeight;
    const header = $('header');

    let currentScroll = window.pageYOffset;
    (prevScroll > currentScroll)
        ?
        header.css('top', '0')
        :
        header.css('top', '-80px')

    prevScroll = currentScroll;

    if (document.documentElement.scrollTop > heightLimit - 80) {
        header.addClass('bg-scroll')
        $('.back-to-top').addClass('show')
    }
    else {
        header.removeClass('bg-scroll')
        $('.back-to-top').removeClass('show')
    }
})
//click back to top
$('.back-to-top').click(() => {
    window.scrollTo(0, 0)
})

//btn show menu mobile
$('.btn-menu').click(() => {
    $('.btn-menu').toggleClass('clicked')
    $('.menu').toggleClass('active')

})

//show iframe video
$.each($('.play-quality'), function (index, value) {

    value.addEventListener('click', function (e) {
        $('#video-iframe').attr('src', `https://www.youtube.com/embed/${value.getAttribute('data-video-src')}`)
        $('.pop-video').addClass('show-video')
    })
})
$('.pop-video .close-video-quality').click(function (e) {
    $('.pop-video').removeClass('show-video')
    $('#video-iframe').attr('src', '')
})

// click menu go to section
$.each($('.menu__item a'), function (index, value) {
    value.addEventListener('click', function (e) {
        if (this.getAttribute('data-id') != 'home') {
            window.scrollTo(0, $(`#${this.getAttribute('data-id')}`)[0].offsetTop)
        }
        else {
            window.scrollTo(0, 0)
        }
    })
})

// toggle form
$.each($('.auth__item'), function (index, value) {
    value.addEventListener('click', function (event) {
        $.each($('.form'), function (index, value) {
            value.classList.remove('active')
        });
        $.each($('.auth__item'), function (index, value) {
            value.classList.remove('active')
        });
        $('.form')[index].classList.add('active')
    });
});

//validate login
$(document).ready(function (e) {
    $('#btnSubmit').click(function (e) {
        let email = $("input[name='email']").val();
        let password = $("input[name='password']").val();
        console.log(email + ' ' + password);
    })
})


// flickity lib
let $carousel = $('.slider__images');
$carousel.flickity({
    contain: true,
    wrapAround: true,
    // mousewheel: true, 
    prevNextButtons: false,
    pageDots: true,
    autoPlay: 3000,
    pauseAutoPlayOnHover: false,
    selectedAttraction: 0.01,
    friction: 0.15,
    on: {
        ready: function(){
            let dotted = $(".flickity-page-dots");
            paging = $('.paging');
            dotted.appendTo(paging);
            $(".paging .flickity-page-dots").addClass('dotted');
        },
        change: function(index){
            $('.paging__number').text((index + 1).toString().padStart(2, '0'));
        }
    }
})

$('.dot__list').on( 'click', 'li', function() {
    var index = $(this).index();
    $carousel.flickity( 'select', index );
});
$('.--prev').on('click', function(){
    $carousel.flickity('previous');
});
$('.--next').on('click', function(){
    $carousel.flickity('next');
});

// slide show item
$('.show-list').flickity({
    // contain: true,
    wrapAround: true,
    prevNextButtons: false,
    pageDots: false,
    // selectedAttraction: 0.01,
    // friction: 0.15,
    // freeScroll: true
})
// img  to svg
$(document).ready(function () {
    $(".svg").svgToInline();

});

// cursor
let cursor = $('.cursor');

$(window).on('mousemove', function(e){
    gsap.to(cursor,{
        x: e.pageX - (cursor.width() / 2),
        y: e.pageY - (cursor.height() / 2),
        duration: 0.2
    })
})
document.querySelectorAll('.--img-box img').forEach(item =>{
    item.addEventListener('mousemove', function(e){
        let x = -(this.clientWidth/2) + (-this.clientWidth + e.offsetX*3)/100
        let y = -(this.clientHeight/2) + (-this.clientHeight + e.offsetY*3)/100
        
        this.style.transform = `translateX(${x}px) translateY(${y}px)`;
    
    })
})

document.querySelectorAll('.--img-box img').forEach(item => {
    item.addEventListener('mouseleave', function(e){
        this.style.transform = `translateX(-50%) translateY(-50%)`;
    
    })
})





