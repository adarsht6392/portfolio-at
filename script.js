// ============================================
// PRELOADER
// ============================================
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('preloader').classList.add('hide');
    }, 3000);
});

// ============================================
// CUSTOM CURSOR
// ============================================
const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');

document.addEventListener('mousemove', (e) => {
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
    outline.style.left = e.clientX + 'px';
    outline.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button, .btn-primary, .btn-outline, .c-card, .skill-item, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => outline.classList.add('hover'));
    el.addEventListener('mouseleave', () => outline.classList.remove('hover'));
});

// ============================================
// NAVBAR
// ============================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile Menu
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active Link
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 200) {
            current = sec.getAttribute('id');
        }
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
});

// ============================================
// THEME TOGGLE
// ============================================
const themeBtn = document.getElementById('themeBtn');

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light');
    const icon = themeBtn.querySelector('i');
    icon.className = document.body.classList.contains('light') ? 'fas fa-sun' : 'fas fa-moon';
    localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
});

if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light');
    themeBtn.querySelector('i').className = 'fas fa-sun';
}

// ============================================
// SCROLL PROGRESS BAR
// ============================================
window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    document.getElementById('progressBar').style.width = (scrollTop / scrollHeight * 100) + '%';
});

// ============================================
// SCROLL TO TOP
// ============================================
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('show', window.scrollY > 500);
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================================
// TYPING ANIMATION
// ============================================
const typed = document.getElementById('typed');
const roles = ['Full Stack Developer', 'MERN Stack Developer', 'Backend Developer', 'Frontend Developer', 'Problem Solver'];
let roleIndex = 0, charIndex = 0, deleting = false;

function typeEffect() {
    const current = roles[roleIndex];
    typed.textContent = current.substring(0, deleting ? charIndex-- : ++charIndex);

    let speed = deleting ? 40 : 80;

    if (!deleting && charIndex === current.length) {
        speed = 2000;
        deleting = true;
    } else if (deleting && charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 500;
    }
    setTimeout(typeEffect, speed);
}

typeEffect();

// ============================================
// COUNTER ANIMATION
// ============================================
const statNums = document.querySelectorAll('.stat-num');

const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.target);
            let count = 0;
            const inc = target / 40;
            const update = () => {
                if (count < target) {
                    count += inc;
                    entry.target.textContent = Math.ceil(count) + '+';
                    requestAnimationFrame(update);
                } else {
                    entry.target.textContent = target + '+';
                }
            };
            update();
            counterObs.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNums.forEach(n => counterObs.observe(n));

// ============================================
// SKILL BARS
// ============================================
const skillFills = document.querySelectorAll('.skill-fill');

const skillObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            skillFills.forEach(fill => {
                fill.style.width = fill.dataset.width;
            });
            skillObs.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

const skillsSection = document.querySelector('.skills');
if (skillsSection) skillObs.observe(skillsSection);

// ============================================
// SCROLL REVEAL
// ============================================
const revealEls = document.querySelectorAll(
    '.skill-item, .project-card, .featured-project, .edu-card, .c-card, .about-info-item, .about-grid, .map-card'
);

const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('active'), i * 60);
        }
    });
}, { threshold: 0.05 });

revealEls.forEach(el => {
    el.classList.add('reveal');
    revealObs.observe(el);
});

// ============================================
// VANILLA TILT
// ============================================
VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
    max: 8,
    speed: 400,
    glare: true,
    'max-glare': 0.1
});

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

console.log('🚀 Portfolio loaded!');