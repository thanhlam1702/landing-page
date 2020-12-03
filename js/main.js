

var prevScroll = window.pageYOffset;
window.onscroll = function () { myFunction() };

function myFunction() {
    let heightLimit = document.getElementsByClassName('slider')[0].clientHeight - 80
    const header = document.getElementsByTagName('header')[0];

    var currentScroll = window.pageYOffset;
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
