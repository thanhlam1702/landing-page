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
$.each($('.videos__item-img'), function (index, value) {

    value.addEventListener('click', function (e) {
        $('#video-iframe').attr('src', `https://www.youtube.com/embed/${$('.play-quality')[index].getAttribute('data-video-src')}`)
        $('.pop-video').addClass('show-video')
    })
})
$('.pop-video .close-video-quality').click(function (e) {
    $('.pop-video').removeClass('show-video')
    $('#video-iframe').attr('src', '')
})
$('.pop-video').click(function(){
    $('.pop-video .close-video-quality').trigger('click');
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
// $(document).ready(function () {
//     $(".icon-svg").svgToInline();

// });

// cursor
// let cursor = $('.cursor');

// $(window).on('mousemove', function(e){
//     gsap.to(cursor,{
//         x: e.pageX - (cursor.width() / 2),
//         y: e.pageY - (cursor.height() / 2),
//         duration: 0.2
//     })
// })
document.querySelectorAll('.--img-box img').forEach(item =>{
    item.addEventListener('mousemove', function(e){
        
        let posX = -(((this.clientWidth/2) - e.offsetX)*5)/100
        let posY = -(((this.clientHeight/2) - e.offsetY)*5)/100
        gsap.to(item, {
            x: posX,
            y: posY,
            scale: 1.1,
            duration: 1,
        })
    })
    item.addEventListener('mouseleave', function(){
        gsap.to(item, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 1,
        })
    })
})

document.querySelectorAll('.--img-box img').forEach(item => {
    item.addEventListener('mouseleave', function(e){
        this.style.transform = `translateX(-50%) translateY(-50%)`;
    
    })
})

var initPhotoSwipeFromDOM = function(gallerySelector) {
    var parseThumbnailElements = function(el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;
        for(var i = 0; i < numNodes; i++) {
            figureEl = thumbElements[i]; // <figure> element
            if(figureEl.nodeType !== 1) {
                continue;
            }
            linkEl = figureEl.children[0]; // <a> element
            size = linkEl.getAttribute('data-size').split('x');
            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };
            if(figureEl.children.length > 1) {
                item.title = figureEl.children[1].innerHTML; 
            }
            if(linkEl.children.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                item.msrc = linkEl.children[0].getAttribute('src');
            } 
            item.el = figureEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }
        return items;
    };
    var closest = function closest(el, fn) {
        return el && ( fn(el) ? el : closest(el.parentNode, fn) );
    };
    var onThumbnailsClick = function(e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
        var eTarget = e.target || e.srcElement;
        var clickedListItem = closest(eTarget, function(el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });
        if(!clickedListItem) {
            return;
        }
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;
        for (var i = 0; i < numChildNodes; i++) {
            if(childNodes[i].nodeType !== 1) { 
                continue; 
            }
            if(childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }
        if(index >= 0) {
            openPhotoSwipe( index, clickedGallery );
        }
        return false;
    };
    var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
        params = {};
        if(hash.length < 5) {
            return params;
        }
        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if(!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');  
            if(pair.length < 2) {
                continue;
            }           
            params[pair[0]] = pair[1];
        }
        if(params.gid) {
            params.gid = parseInt(params.gid, 10);
        }
        return params;
    };
    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;
        items = parseThumbnailElements(galleryElement);
        options = {
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),
            getThumbBoundsFn: function(index) {
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect(); 

                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            },
            showAnimationDuration : 0,
            hideAnimationDuration : 0
        };
        if(fromURL) {
            if(options.galleryPIDs) {
                for(var j = 0; j < items.length; j++) {
                    if(items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }
        if( isNaN(options.index) ) {
            return;
        }
        if(disableAnimation) {
            options.showAnimationDuration = 0;
        }
        gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };
    var galleryElements = document.querySelectorAll( gallerySelector );
    for(var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i+1);
        galleryElements[i].onclick = onThumbnailsClick;
    }
    var hashData = photoswipeParseHash();
    if(hashData.pid && hashData.gid) {
        openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
    }
};

$(window).load(function () {
    initPhotoSwipeFromDOM('.list__img');
});






