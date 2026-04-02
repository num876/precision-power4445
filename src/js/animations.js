import { isMobile, isHoverable } from './utils.js';
import VanillaTilt from 'vanilla-tilt';

export const initRevealAnimations = () => {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
};

export const initCustomCursor = () => {
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
};

export const initHeroEffects = () => {
    const hero = document.querySelector('#hero');
    const cursorGlow = document.querySelector('.hero-cursor-glow');

    if (hero && isHoverable && !isMobile()) {
        hero.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            if (cursorGlow) {
                cursorGlow.style.left = `${clientX}px`;
                cursorGlow.style.top = `${clientY}px`;
            }
        });
    }
};

export const initTilts = () => {
    if (isHoverable && !isMobile()) {
        VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.2,
        });
    }
};

export const initHeroAnimations = () => {
    if (isMobile()) {
        window.addEventListener('load', () => {
            const heroTitle = document.getElementById('hero-title');
            const heroSubtitle = document.getElementById('hero-subtitle');
            const heroActions = document.getElementById('hero-actions');
            const badgeContainer = document.getElementById('badge-container');
            const badgePills = document.querySelectorAll('.badge-pill');

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

            // Buttons touch feedback
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
    }
};
