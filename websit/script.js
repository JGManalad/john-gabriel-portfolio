// ===== DOM READY =====
document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initSmoothScroll();
    initScrollAnimations();
    initScrollIndicator();
    initContactForm();
    initProjectLinks();
});

// ===== NAVBAR SCROLL EFFECT =====
function initNavbar() {
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ===== SMOOTH SCROLLING =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-animation]').forEach(el => {
        observer.observe(el);
    });
}

// ===== SCROLL INDICATOR =====
function initScrollIndicator() {
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    document.body.appendChild(scrollIndicator);

    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollIndicator.style.width = scrollPercent + '%';
    });
}

// ===== ACTIVE NAV LINK =====
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ===== CONTACT FORM =====
function initContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        submitBtn.innerHTML = '<span class="loading me-2"></span>Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            alert('🎉 Thank you for your message! I\'ll get back to you soon.');
            form.reset();
            submitBtn.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Send Message';
            submitBtn.disabled = false;
        }, 2000);
    });
}

// ===== PROJECT LINKS (Replace with your actual links) =====
function initProjectLinks() {
    const projectLinks = document.querySelectorAll('.project-overlay a');
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            alert('🔗 Replace this with your actual GitHub/Live demo links!\n\nUpdate the href attributes in the HTML.');
        });
    });
}

// ===== PARALLAX EFFECT FOR HERO =====
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-section');
    const rate = scrolled * -0.5;
    hero.style.transform = `translateY(${rate}px)`;
});

// ===== COUNTER ANIMATION (Optional) =====
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
}

// ===== TYPEWRITER EFFECT (Optional for hero text) =====
function initTypewriter() {
    const heroText = "Full Stack Developer";
    const typewriterElement = document.querySelector('.typewriter');
    
    if (typewriterElement) {
        let i = 0;
        function typeWriter() {
            if (i < heroText.length) {
                typewriterElement.textContent += heroText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        typeWriter();
    }
}

// ===== MOBILE MENU SMOOTH CLOSE =====
document.querySelector('.navbar-toggler').addEventListener('click', function() {
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 300);
});

// ===== BACK TO TOP BUTTON =====
function createBackToTop() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTop.className = 'btn btn-warning back-to-top rounded-circle shadow-lg';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 60px;
        height: 60px;
        z-index: 1000;
        display: none;
        border: none;
        font-size: 1.2rem;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.style.display = 'block';
            backToTop.style.opacity = '1';
        } else {
            backToTop.style.opacity = '0';
            setTimeout(() => backToTop.style.display = 'none', 300);
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

createBackToTop();

// ===== INITIALIZE ALL FEATURES =====
window.addEventListener('load', function() {
    // Small delay for better performance
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
});