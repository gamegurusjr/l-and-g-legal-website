// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function(){
    var toggle = document.getElementById('menuToggle');
    var nav = document.getElementById('mainNav');
    if(toggle && nav){
        toggle.addEventListener('click', function(){
            var open = nav.classList.toggle('open');
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
    }

    // Dropdown toggles for mobile
    document.querySelectorAll('.has-drop > a').forEach(function(link){
        link.addEventListener('click', function(e){
            if(window.innerWidth <= 900){
                e.preventDefault();
                link.parentElement.classList.toggle('open');
            }
        });
    });

    // Contact form
    var contactForm = document.getElementById('contactForm');
    if(contactForm){
        contactForm.addEventListener('submit', function(e){
            e.preventDefault();
            var formWrap = document.getElementById('formWrap');
            var thanksMsg = document.getElementById('thanksMsg');
            if(formWrap) formWrap.style.display = 'none';
            if(thanksMsg) thanksMsg.classList.add('show');
        });
    }

    // Update copyright year
    try{
        var y = new Date().getFullYear();
        var copyLine = document.getElementById('copyLine');
        if(copyLine){
            copyLine.textContent = '© ' + y + ' L&G Legal. All legal services are provided by the Gusdal Law Corporation and/or Shimon Leibl Law Corporation.';
        }
    }catch(e){}

    // Hero Slider (only on index page)
    var slides = document.getElementById('heroSlides');
    var prevBtn = document.getElementById('prevSlide');
    var nextBtn = document.getElementById('nextSlide');
    var dotsContainer = document.getElementById('sliderDots');
    if(slides && prevBtn && nextBtn && dotsContainer){
        initHeroSlider(slides, prevBtn, nextBtn, dotsContainer);
    }
});

function initHeroSlider(slides, prevBtn, nextBtn, dotsContainer){
    var slideElements = slides.querySelectorAll('.slide');
    var totalSlides = slideElements.length;
    var currentSlide = 0;
    var autoSlideInterval;
    var isAnimating = false;

    // Create dots
    slideElements.forEach(function(_, index){
        var dot = document.createElement('button');
        dot.setAttribute('aria-label', 'Go to slide ' + (index + 1));
        if(index === 0) dot.classList.add('active');
        dot.addEventListener('click', function(){ goToSlide(index); });
        dotsContainer.appendChild(dot);
    });
    var dots = dotsContainer.querySelectorAll('button');

    function updateSlider(){
        slides.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
        slideElements.forEach(function(slide, index){
            slide.classList.toggle('active', index === currentSlide);
        });
        dots.forEach(function(dot, index){
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function goToSlide(index){
        if(isAnimating || index === currentSlide) return;
        isAnimating = true;
        currentSlide = index;
        updateSlider();
        setTimeout(function(){ isAnimating = false; }, 600);
        resetAutoSlide();
    }

    function nextSlide(){
        var next = (currentSlide + 1) % totalSlides;
        goToSlide(next);
    }

    function prevSlide(){
        var prev = (currentSlide - 1 + totalSlides) % totalSlides;
        goToSlide(prev);
    }

    function startAutoSlide(){
        autoSlideInterval = setInterval(nextSlide, 6000);
    }

    function resetAutoSlide(){
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Pause on hover
    var slider = document.querySelector('.hero-slider');
    if(slider){
        slider.addEventListener('mouseenter', function(){ clearInterval(autoSlideInterval); });
        slider.addEventListener('mouseleave', startAutoSlide);
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e){
        if(e.key === 'ArrowLeft') prevSlide();
        if(e.key === 'ArrowRight') nextSlide();
    });

    // Touch/swipe support
    var touchStartX = 0;
    slides.addEventListener('touchstart', function(e){ touchStartX = e.touches[0].clientX; }, {passive: true});
    slides.addEventListener('touchend', function(e){
        var touchEndX = e.changedTouches[0].clientX;
        var diff = touchStartX - touchEndX;
        if(Math.abs(diff) > 50){
            if(diff > 0) nextSlide(); else prevSlide();
        }
    }, {passive: true});

    // Initialize
    updateSlider();
    startAutoSlide();
}
