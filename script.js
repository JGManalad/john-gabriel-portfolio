// ===== DOM READY =====
document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initSmoothScroll();
    initScrollAnimations();
    initScrollIndicator();
    initContactForm();
    initProjectLinks();
    initCertificateModal();  // ✅ NEW: Certificate modal
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

// ===== CERTIFICATE MODAL FUNCTIONALITY ✅ NEW =====
function initCertificateModal() {
    // Handle multiple certificates
    document.querySelectorAll('.cert-img').forEach(img => {
        img.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent any default behavior
            
            const src = this.getAttribute('src');
            const title = this.getAttribute('data-cert-title');
            const desc = this.getAttribute('data-cert-desc');
            
            // Update modal content dynamically
            const modalImg = document.getElementById('modalCertImg');
            const modalTitle = document.getElementById('modalCertTitle');
            const modalDesc = document.getElementById('modalCertDesc');
            const modalLabel = document.getElementById('certModalLabel');
            
            if (modalImg && modalTitle && modalDesc && modalLabel) {
                modalImg.src = src;
                modalTitle.textContent = title;
                modalDesc.textContent = desc;
                modalLabel.textContent = title + ' Certificate';
                
                // Trigger modal open (Bootstrap will handle it via data-bs-toggle)
                const modal = new bootstrap.Modal(document.getElementById('certModal'));
                modal.show();
            }
        });
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
    if (!form) return;
    
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

// ===== PROJECT LINKS =====
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
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
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
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
});