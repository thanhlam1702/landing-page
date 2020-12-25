

// Scroll header change color and hidden visible
let prevScroll = window.pageYOffset;
let heightLimit = document.getElementsByClassName('slider')[0].clientHeight - 80

window.onscroll = function () { myFunction() };

function myFunction() {

    let heightLimit = document.getElementsByClassName('slider')[0].clientHeight - 80
    const header = document.getElementsByTagName('header')[0];

    let currentScroll = window.pageYOffset;
    if (prevScroll > currentScroll) {
        document.getElementsByTagName('header')[0].style.top = "0";
    } else {
        document.getElementsByTagName('header')[0].style.top = "-80px";
    }
    prevScroll = currentScroll;

    if (document.body.scrollTop > heightLimit || document.documentElement.scrollTop > heightLimit) {
        header.classList.add('bg-scroll');
    }
    else {
        header.classList.remove('bg-scroll');
    }

}
// Active nav header when scroll to section ============
let listNav = document.querySelectorAll('.menu__item a')

listNav.forEach((e) => {
    e.addEventListener('click', function (event) {
        let idSection = this.getAttribute('data-id')
        if (idSection != 'home') {
            let posTarget = document.getElementById(`${idSection}`).offsetTop
            window.scrollTo(0, posTarget)
        }
        else {
            window.scrollTo(0, 0)
        }
    })
})

let sections = []
listNav.forEach((e) => {
    let section = e.getAttribute('data-id')
    sections.push(section)
})
window.addEventListener('scroll', function (e) {
    let posScroll = window.pageYOffset;
    sections.forEach(function(sc, index){
        if(sc != 'home'){
            if(posScroll > document.querySelector(`#${sc}`).offsetTop){
                listNav.forEach((item) =>{
                    item.classList.remove('active')
                })
                listNav[index].classList.add('active')
            }
        }
    })
})

//=======================================================

// Toggle class button menu==============================
let btnMenu = document.querySelector('.btn-menu')
let menu = document.querySelector('.menu');

btnMenu.addEventListener('click', () => {
    btnMenu.classList.toggle('clicked');
    menu.classList.toggle('active');
})

// Toggle language =======================================
let langBtn = document.querySelector('.language__current');
let langCurrent = document.querySelector('.language__current-item');
let langList = document.querySelector('.language__list');
let iconLang = document.querySelector('.language__btn');

langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    langList.classList.toggle('active');
    iconLang.classList.toggle('click');
})
document.addEventListener('click', (e) => {
    e.preventDefault();
    langList.classList.remove('active');
    iconLang.classList.remove('click');
})
// Back to top ===============================================
document.querySelector('.back-to-top').addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollBy({
        top: -document.body.offsetHeight,
        behavior: "smooth"
    })
})

window.addEventListener('scroll', () => {
    let scrollTop = document.querySelector('html').scrollTop;
    if (scrollTop > heightLimit) {
        document.querySelector('.back-to-top').classList.add('show')
    }
    else {
        document.querySelector('.back-to-top').classList.remove('show')
    }
})

// Video iframe =============================================
let videoIframe = document.querySelector('#video-iframe');
document.querySelectorAll('.play-quality').forEach((e) => {
    e.addEventListener('click', function (e) {
        let videoSrc = this.getAttribute('data-video-src');
        videoIframe.src = `https://www.youtube.com/embed/${videoSrc}`
        document.querySelector('.pop-video').classList.add('show-video');
    })
})

document.querySelector('.pop-video .close-video-quality').addEventListener('click', function () {
    document.querySelector('.pop-video').classList.remove('show-video');
    videoIframe.src = "";
})

//====================================================
// Slider

let listSlider = document.querySelectorAll('.slider__images-item')
let prev = document.querySelector('.--prev')
let next = document.querySelector('.--next')
let slideNumber = document.querySelector('.paging__number');
let listDotted = document.querySelectorAll('.dotted li')
let currentSlide = 0

next.addEventListener('click', function (e) {
    // Nếu lớn hơn độ lớn hơn số item thì gán bằng số item
    if (currentSlide >= listSlider.length - 1) {
        currentSlide = listSlider.length - 1
    }
    else {
        currentSlide++
    }
    //sau khi ++ mà lớn hơn sô lượng item thì thêm active cho nút để biết k bấm được nữa
    if (currentSlide >= listSlider.length - 1) {
        next.classList.add('active')
    }
    // Sự kiện đúng khi lớn hơn 0 và bé hơn số lượng item - 1
    if (currentSlide < listSlider.length && currentSlide > 0) {
        // Nếu lớn hơn 1 thì mới cần bỏ đi 1 class prev-slide, nếu k nó sẽ k tìm thấy giá trị để bỏ đi
        if (currentSlide > 1) {
            listSlider[currentSlide - 2].classList.remove('prev-slide')
        }
        listSlider[currentSlide - 1].classList.remove('active')
        listSlider[currentSlide - 1].classList.add('prev-slide')

        prev.classList.remove('active')
        listSlider[currentSlide].classList.remove('next-slide')
        listSlider[currentSlide].classList.add('active')
        // Khi active là slider cuối thì không cần thêm class next-slide
        // Bé hớn số lượng item thì mới có thằng sau để thêm
        if (currentSlide < listSlider.length - 1) {
            listSlider[currentSlide + 1].classList.add('next-slide')
        }
    }
    slideNumber.innerText = (currentSlide + 1).toString().padStart(2, '0')
    listDotted[currentSlide - 1].classList.remove('active')
    listDotted[currentSlide].classList.add('active')
})

prev.addEventListener('click', function (e) {
    if (currentSlide <= 0) {
        currentSlide = 0
    }
    else {
        currentSlide--
    }
    // Thể hiện nút không bấm được nữa
    if (currentSlide <= 0) {
        prev.classList.add('active')
    }
    // 0
    if (currentSlide < listSlider.length && currentSlide >= 0) {
        // Khí pre đến slide đầu thì trước k còn slide nào nên k cần thêm class prev
        if (currentSlide > 0) {
            listSlider[currentSlide - 1].classList.add('prev-slide')
        }
        listSlider[currentSlide].classList.remove('prev-slide')
        listSlider[currentSlide].classList.add('active')

        listSlider[currentSlide + 1].classList.remove('active')
        listSlider[currentSlide + 1].classList.add('next-slide')

        next.classList.remove('active')
        // Phải bé hơn số lượng item - 2 thì mới bỏ đi 1 class next bị dư
        if (currentSlide < listSlider.length - 2) {
            listSlider[currentSlide + 2].classList.remove('next-slide')
        }

    }

    slideNumber.innerText = (currentSlide + 1).toString().padStart(2, '0')
    listDotted[currentSlide].classList.add('active')
    listDotted[currentSlide + 1].classList.remove('active')
})


//Auth form================================================
let listAuthItem = document.querySelectorAll('.auth__item');
let listForm = document.querySelectorAll('.auth-container .form');
listAuthItem.forEach((e, index) => {
    e.addEventListener('click', function (event) {
        listAuthItem.forEach((e) => {
            e.classList.remove('active')
        })
        listForm.forEach((e) => {
            e.classList.remove('active')
        })
        this.classList.add('active')
        listForm[index].classList.add('active')
    })
})
// carousel lib==========================

// listDotted.forEach((e) =>{
//     e.addEventListener('click', function(event){
//         e.cla
//     })
// })


var $carousel = $('.carousel').flickity({
    freeScroll: true,
    contain: true,
    wrapAround: true,
    // mousewheel: true, 
    // keyboard: true,
    // disable previous & next buttons and dots
    prevNextButtons: false,
    pageDots: false
});




