import Lenis from 'lenis';
import VanillaTilt from 'vanilla-tilt';

// Mobile Detection
const isMobile = () => window.innerWidth <= 768;
const isHoverable = window.matchMedia('(hover: hover)').matches;

// Mobile Hero Animations - Trigger on load
if (isMobile()) {
    window.addEventListener('load', () => {
        const heroTitle = document.getElementById('hero-title');
        const heroSubtitle = document.getElementById('hero-subtitle');
        const heroActions = document.getElementById('hero-actions');
        const badgeContainer = document.getElementById('badge-container');
        const badgePills = document.querySelectorAll('.badge-pill');

        // Stagger animations
        if (heroTitle) {
            heroTitle.style.animation = 'slide-up 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards';
            heroTitle.style.opacity = '1';
        }

        if (heroSubtitle) {
            heroSubtitle.style.animation = 'slide-up 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.2s forwards';
            heroSubtitle.style.opacity = '1';
        }

        if (badgeContainer) {
            badgePills.forEach((pill, index) => {
                pill.style.animation = `bounce-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.4 + index * 0.1}s forwards`;
                pill.style.opacity = '0';
            });
        }

        if (heroActions) {
            heroActions.style.animation = 'slide-up 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.6s forwards';
            heroActions.style.opacity = '1';
        }

        // Add button tap animation
        const buttons = document.querySelectorAll('.hero-actions .btn');
        buttons.forEach(btn => {
            btn.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
                if (navigator.vibrate) navigator.vibrate(20);
            });
            btn.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        });
    });

    // Hide scroll indicator on scroll
    window.addEventListener('scroll', () => {
        const scrollIndicator = document.getElementById('scroll-indicator');
        if (scrollIndicator && window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        }
    });
}

// 2. Project Data with Case Studies (Problem vs Solution)
const projects = [
    {
        id: "lumina",
        title: "Lumina Dental Studio",
        category: "Medical & Wellness",
        description: "A fear-free dentistry landing page designed with a calm, high-end 'medical spa' aesthetic.",
        problem: "Traditional dental websites feel cold, clinical, and anxiety-inducing, often leading to patient dropout before booking.",
        solution: "We created a 'Spa-like' digital experience using soft salmon palettes and human-centric imagery to shift the perception from 'clinical necessity' to 'wellness indulgence'.",
        tags: ["React", "Tailwind", "Framer Motion"],
        image: "./assets/lumina-mockup.png",
        link: "https://v0-lumina-dental-landing-page-blond.vercel.app/",
        color: "var(--accent-lumina)"
    },
    {
        id: "oxford",
        title: "Oxford Wrestling Academy",
        category: "Athletics & Training",
        description: "A bold, high-energy platform for elite freestyle and Greco-Roman wrestling.",
        problem: "Wrestling academies often rely on outdated, static sites that fail to convey the prestige, intensity, and discipline of the sport.",
        solution: "Implemented a high-contrast UI with industrial typography and aggressive orange accents to mirror the academy's 'Champions are Forged' philosophy.",
        tags: ["React", "Tailwind", "GSAP"],
        image: "./assets/oxford-mockup.png",
        link: "https://v0-website-improvement-suggestions-tau.vercel.app/",
        color: "var(--accent-oxford)"
    }
];

// 3. Dynamic Project Rendering & Modal Logic
const projectGrid = document.querySelector('.project-grid');
const modal = document.querySelector('#project-modal');

if (projectGrid) {
    projectGrid.innerHTML = projects.map(project => `
        <article class="project-card reveal" data-tilt data-id="${project.id}">
            <div class="project-image-link" style="cursor: pointer;">
                <div class="project-image-container">
                    <img src="${project.image}" alt="${project.title}" class="project-img">
                    <div class="project-overlay">
                        <span class="btn btn-primary btn-sm">View Case Study</span>
                    </div>
                </div>
            </div>
            <div class="project-info">
                <div class="project-category" style="color: ${project.color};">${project.category}</div>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-desc">${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
                </div>
            </div>
        </article>
    `).join('');

    // Handle Project Clicks (Modals)
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.project-image-link')) {
                const project = projects.find(p => p.id === card.dataset.id);
                openModal(project);
            }
        });
    });
}

function openModal(project) {
    const modalContent = document.querySelector('.modal-body');
    modalContent.innerHTML = `
        <h2 class="modal-title" style="margin-bottom: var(--spacing-md);">${project.title}</h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-md); margin-bottom: var(--spacing-lg);">
            <div>
                <h4 style="color: var(--accent-primary); margin-bottom: var(--spacing-xs);">The Problem</h4>
                <p style="font-size: 0.95rem; color: var(--text-muted);">${project.problem}</p>
            </div>
            <div>
                <h4 style="color: #4ade80; margin-bottom: var(--spacing-xs);">The Solution</h4>
                <p style="font-size: 0.95rem; color: var(--text-muted);">${project.solution}</p>
            </div>
        </div>
        <div style="text-align: center;">
            <a href="${project.link}" target="_blank" class="btn btn-primary">Visit Live Site</a>
        </div>
    `;
    modal.classList.add('active');
}

// Close Modal
document.querySelector('.close-modal').addEventListener('click', () => {
    modal.classList.remove('active');
});

if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });
}

// Initialize Tilts after rendering - Only if hover is supported
if (isHoverable && !isMobile()) {
    VanillaTilt.init(document.querySelectorAll(".project-card"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
    });
}

// Mobile-optimized project card interactions
if (isMobile()) {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('touchstart', function() {
            this.style.transform = 'translateY(-8px)';
            if (navigator.vibrate) navigator.vibrate(15);
        });
        card.addEventListener('touchend', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}
// 4. Custom Cursor Logic (LERP) - Only if hover is supported and NOT mobile
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

if (isHoverable && !isMobile() && cursorDot && cursorOutline) {
    window.addEventListener("mousemove", (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Cursor Interactions
    document.querySelectorAll('a, button, .project-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorOutline.style.background = 'hsla(240, 100%, 70%, 0.1)';
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.background = 'transparent';
        });
    });
}

// 5. Dynamic Hero Parallax & Focus Glow - Only on desktop
const hero = document.querySelector('#hero');
const floatCards = document.querySelectorAll('.hero-float-card');
const cursorGlow = document.querySelector('.hero-cursor-glow');

if (hero && isHoverable && !isMobile()) {
    hero.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;

        // Move Focus Glow with Smooth Lag
        cursorGlow.style.left = `${clientX}px`;
        cursorGlow.style.top = `${clientY}px`;

        // Move Floating Cards with Parallax
        floatCards.forEach(card => {
            const speed = card.getAttribute('data-speed');
            const x = (innerWidth - clientX * speed) / 100;
            const y = (innerHeight - clientY * speed) / 100;
            card.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
    });
}

// 6. Mobile Menu Logic with Enhanced Touch Support
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        hamburger.classList.toggle('open');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('open');
        });

        // Add touch feedback
        link.addEventListener('touchstart', function() {
            this.style.opacity = '0.7';
        });

        link.addEventListener('touchend', function() {
            this.style.opacity = '1';
        });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.hamburger') && !e.target.closest('.mobile-menu')) {
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('open');
        }
    });
}

// 5. Functional Contact Form Simulation
const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('.form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerText;
        
        btn.disabled = true;
        btn.innerText = 'Sending...';
        btn.style.animation = 'button-pulse 1.5s infinite';
        formStatus.innerHTML = '';

        // Add haptic feedback on mobile
        if (isMobile() && navigator.vibrate) {
            navigator.vibrate(50);
        }

        // Simulate functional API call
        setTimeout(() => {
            btn.disabled = false;
            btn.innerText = originalText;
            btn.style.animation = 'none';
            formStatus.innerHTML = '<span class="form-success" style="color: #4ade80; animation: fade-in 0.5s ease;">✓ Message sent successfully! We will contact you soon.</span>';
            contactForm.reset();

            // Mobile haptic feedback on success
            if (isMobile() && navigator.vibrate) {
                navigator.vibrate([100, 50, 100]);
            }
        }, 1500);
    });

    // Add hover effects for desktop buttons
    if (!isMobile()) {
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                if (this.classList.contains('btn-primary')) {
                    this.style.boxShadow = '0 15px 30px rgba(112, 112, 255, 0.4)';
                }
            });
            btn.addEventListener('mouseleave', function() {
                this.style.boxShadow = '';
            });
        });
    }
}

// 6. Reveal Animations
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.padding = isMobile() ? '0.6rem 0' : '0.8rem 0';
        navbar.style.background = 'hsla(220, 30%, 5%, 0.95)';
    } else {
        navbar.style.padding = isMobile() ? '0.75rem 0' : '1.5rem 0';
        navbar.style.background = 'transparent';
    }
});

// Handle Resize Events for Mobile/Desktop Transitions
let lastWindowSize = window.innerWidth;
window.addEventListener('resize', () => {
    const currentWindowSize = window.innerWidth;
    if ((lastWindowSize <= 768 && currentWindowSize > 768) || (lastWindowSize > 768 && currentWindowSize <= 768)) {
        // Reload scripts if transitioning between mobile and desktop
        lastWindowSize = currentWindowSize;
    }
});
