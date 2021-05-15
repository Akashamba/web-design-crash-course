function init() {
    const slides = document.querySelectorAll('.ellipse');
    const pages = document.querySelectorAll('.page');
    const background = [
        `radial-gradient(#2b3760, #0b1023)`, 
        `radial-gradient(#4e3022, #161616)`, 
        `radial-gradient(#4e4342, #161616)`
    ];
    let current = 0;
    let scrollSlide = 0;

    slides.forEach((slide, index) => {
        slide.addEventListener('click', function() {
            changeDots(this);
            nextSlide(index);
            scrollSlide = index;
        });
    });

    function changeDots(dot) {
        slides.forEach(slide => {
            slide.classList.remove('ellipse-active');
        })
        dot.classList.add('ellipse-active')
    }

    function nextSlide(pageNumber) {
        const nextPage = pages[pageNumber];
        const currentPage = pages[current];
        const nextLeft = nextPage.querySelector('.hero .hero-left');
        const nextRight = nextPage.querySelector('.hero .hero-right');
        const currentLeft = currentPage.querySelector('.hero .hero-left');
        const currentRight = currentPage.querySelector('.hero .hero-right');
        const nextText = nextPage.querySelector('.details');
        const portfolio = document.querySelector('.portfolio');
    
        const tl = new TimelineMax();
    
        tl.fromTo(currentLeft, 0.3, {y: '-10%'}, {y: '-100%'})
        .fromTo(currentRight, 0.3, {y: '10%'}, {y: '-100%'}, '-=0.2')
        .to(portfolio, 0.3, {backgroundImage: background[pageNumber]})
        .fromTo(currentPage, 0.3, {opacity: 1, pointerEvents: "all"}, {opacity: 0, pointerEvents: "none"})
        .fromTo(nextPage, 0.3, {opacity: 0, pointerEvents: "none"}, {opacity: 1, pointerEvents: "all"},'-=0.6')
        .fromTo(nextLeft, 0.3, {y: '-100%'}, {y: '-10%'}, '-=0.6')
        .fromTo(nextRight, 0.3, {y: '-100%'}, {y: '10%'}, '-=0.8')
        .fromTo(nextText, 0.3, {opacity: 0, y: 30}, {opacity: 1, y: 0})
        .set(nextLeft, {clearProps: 'all'})
        .set(nextRight, {clearProps: 'all'});
        current = pageNumber
    }

    document.addEventListener('wheel', throttle(scrollChange, 1500));
    document.addEventListener('touchmove', throttle(scrollChange, 1500));

    function switchDots(dotNumber) {
        const activeDot = document.querySelectorAll('.ellipse')[dotNumber];
        slides.forEach(slide => {
            slide.classList.remove('ellipse-active');
        })
        activeDot.classList.add('ellipse-active')
    }

    function scrollChange(e) {
        if(e.deltaY > 0) {
            scrollSlide += 1
        }
        else {
            scrollSlide -= 1
        }

        if(scrollSlide > 2) {
            scrollSlide = 0
        }

        if(scrollSlide < 0) {
            scrollSlide = 2
        }
        switchDots(scrollSlide);
        nextSlide(scrollSlide);
    }
    
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if(!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => (inThrottle = false), limit);
            }
        }
    }

    const menu = document.querySelector('.menu');
    const logo = document.querySelector('.logo');
    const navOpen = document.querySelector('.nav-open');
    const contact = document.querySelector('.contact');
    const social = document.querySelector('.social');

    const tl = new TimelineMax({paused: true});
    tl.to(navOpen, 0.7, {transform: "translateY(0%)"})
    .fromTo(logo, 0.3, {color: '#fff'}, {color: '#000'}, '-=0')
    .fromTo(menu, 0.3, {color: '#fff'}, {color: '#000'}, '-=0.2')
    .fromTo(contact, 0.3, {opacity: 0, y: 10}, {opacity: 1, y: 0}, '-=0.3')
    .fromTo(social, 0.3, {opacity: 0, y: 10}, {opacity: 1, y: 0}, '-=0.2')

    menu.addEventListener('click', () => {
        tl.reversed() ? tl.play() : tl.reverse();
    })
}


init();