// ===== DOM Ready =====
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileMenu();
    initHeroSlider();
    initStatsCounter();
    initFAQ();
    initTestimonials();
    initBackToTop();
    initScrollReveal();
    initContactForm();
    initSmoothNavHighlight();
});

// ===== Sticky Navbar =====
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const onScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

// ===== Mobile Menu =====
function initMobileMenu() {
    const toggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    if (!toggle || !navLinks) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
            toggle.classList.remove('active');
            navLinks.classList.remove('open');
        }
    });
}

// ===== Hero Slider =====
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.slider-dots .dot');
    const prevBtn = document.getElementById('sliderPrev');
    const nextBtn = document.getElementById('sliderNext');
    if (slides.length === 0) return;

    let current = 0;
    let autoSlideInterval;

    function goToSlide(index) {
        slides[current].classList.remove('active');
        dots[current]?.classList.remove('active');

        current = (index + slides.length) % slides.length;

        slides[current].classList.add('active');
        dots[current]?.classList.add('active');
    }

    function nextSlide() {
        goToSlide(current + 1);
    }

    function prevSlide() {
        goToSlide(current - 1);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 6000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    prevBtn?.addEventListener('click', () => { prevSlide(); resetAutoSlide(); });
    nextBtn?.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => { goToSlide(i); resetAutoSlide(); });
    });

    startAutoSlide();
}

// ===== Stats Counter =====
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length === 0) return;

    let animated = false;

    function animateCounters() {
        statNumbers.forEach(el => {
            const target = parseInt(el.getAttribute('data-target'), 10);
            const duration = 2000;
            const startTime = performance.now();

            function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.round(target * eased).toLocaleString();

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    el.textContent = target.toLocaleString() + '+';
                }
            }

            requestAnimationFrame(update);
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                animateCounters();
            }
        });
    }, { threshold: 0.3 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) observer.observe(statsSection);
}

// ===== FAQ Accordion =====
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question?.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all
            faqItems.forEach(faq => faq.classList.remove('active'));

            // Toggle current
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// ===== Testimonials =====
function initTestimonials() {
    const cards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('#testimonialDots .dot');
    if (cards.length === 0) return;

    let current = 0;
    let autoInterval;

    function goTo(index) {
        cards[current].classList.remove('active');
        dots[current]?.classList.remove('active');

        current = (index + cards.length) % cards.length;

        cards[current].classList.add('active');
        dots[current]?.classList.add('active');
    }

    function startAuto() {
        autoInterval = setInterval(() => goTo(current + 1), 5000);
    }

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            goTo(i);
            clearInterval(autoInterval);
            startAuto();
        });
    });

    startAuto();
}

// ===== Back to Top =====
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== Scroll Reveal =====
function initScrollReveal() {
    const revealElements = [
        '.about-section',
        '.mvm-card',
        '.doctor-card',
        '.service-item',
        '.pharmacy-section',
        '.blog-card',
        '.testimonials-section',
        '.faq-item',
        '.gallery-item',
        '.contact-section'
    ];

    revealElements.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('reveal');
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger the reveal
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, index * 80);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ===== Contact Form =====
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('#btnSubmit');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';

        // Simulate form submission
        setTimeout(() => {
            submitBtn.textContent = '✓ Sent Successfully!';
            submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            submitBtn.style.opacity = '1';

            setTimeout(() => {
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 3000);
        }, 1500);
    });
}

// ===== Smooth Nav Highlight =====
function initSmoothNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (sections.length === 0 || navLinks.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' });

    sections.forEach(section => observer.observe(section));
}
