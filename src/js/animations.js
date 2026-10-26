import { isMobile, isHoverable } from './utils.js';
import VanillaTilt from 'vanilla-tilt';

export const initRevealAnimations = () => {
    if (isMobile()) {
        // On mobile, elements are immediately visible to ensure instantaneous zero-lag scrolling
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
        initMobileScrollReveal();
        return;
    }

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                const children = entry.target.querySelectorAll('.reveal-child');
                children.forEach((child, index) => {
                    child.style.transitionDelay = `${index * 0.08}s`;
                    child.classList.add('active');
                });

                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
};

export const initCustomCursor = () => {
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");

    if (isHoverable && !isMobile() && cursorDot && cursorOutline) {
        let mouseX = -100;
        let mouseY = -100;
        let outlineX = -100;
        let outlineY = -100;
        let isHovered = false;
        let isRunning = false;

        const render = () => {
            if (!isRunning) return;
            // Smooth lerp interpolation for outline
            outlineX += (mouseX - outlineX) * 0.18;
            outlineY += (mouseY - outlineY) * 0.18;

            cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
            cursorOutline.style.transform = `translate3d(${outlineX}px, ${outlineY}px, 0) translate(-50%, -50%) scale(${isHovered ? 1.5 : 1})`;

            requestAnimationFrame(render);
        };

        window.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (!isRunning) {
                outlineX = mouseX;
                outlineY = mouseY;
                isRunning = true;
                requestAnimationFrame(render);
            }
        }, { passive: true });

        document.querySelectorAll('a, button, .project-card, .faq-trigger').forEach(el => {
            el.addEventListener('mouseenter', () => {
                isHovered = true;
                cursorOutline.style.background = 'hsla(240, 100%, 70%, 0.12)';
            }, { passive: true });
            el.addEventListener('mouseleave', () => {
                isHovered = false;
                cursorOutline.style.background = 'transparent';
            }, { passive: true });
        });
    }
};

export const initHeroEffects = () => {
    const hero = document.querySelector('#hero');
    const cursorGlow = document.querySelector('.hero-cursor-glow');

    if (hero && cursorGlow && isHoverable && !isMobile()) {
        let targetX = 0;
        let targetY = 0;
        let currentX = 0;
        let currentY = 0;
        let isInside = false;

        const renderGlow = () => {
            if (!isInside) return;
            currentX += (targetX - currentX) * 0.12;
            currentY += (targetY - currentY) * 0.12;
            cursorGlow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
            requestAnimationFrame(renderGlow);
        };

        let heroRect = null;
        hero.addEventListener('mouseenter', () => {
            heroRect = hero.getBoundingClientRect();
            isInside = true;
            requestAnimationFrame(renderGlow);
        }, { passive: true });

        hero.addEventListener('mousemove', (e) => {
            if (!heroRect) heroRect = hero.getBoundingClientRect();
            targetX = e.clientX - heroRect.left;
            targetY = e.clientY - heroRect.top;
        }, { passive: true });

        hero.addEventListener('mouseleave', () => {
            isInside = false;
            heroRect = null;
        }, { passive: true });
    }
};

export const initTilts = () => {
    if (isHoverable && !isMobile()) {
        VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
            max: 10,
            speed: 500,
            glare: true,
            "max-glare": 0.15,
            scale: 1.02,
        });
    }
};

export const initHeroAnimations = () => {
    if (isMobile()) {
        const animateHero = () => {
            const heroTitle = document.getElementById('hero-title');
            const heroSubtitle = document.getElementById('hero-subtitle');
            const heroActions = document.getElementById('hero-actions');

            if (heroTitle) {
                heroTitle.style.animation = 'slide-up 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards';
                heroTitle.style.opacity = '1';
            }

            if (heroSubtitle) {
                heroSubtitle.style.animation = 'slide-up 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.15s both';
                heroSubtitle.style.opacity = '1';
            }

            if (heroActions) {
                heroActions.style.animation = 'slide-up 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.3s both';
                heroActions.style.opacity = '1';
            }
        };

        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            requestAnimationFrame(animateHero);
        } else {
            window.addEventListener('DOMContentLoaded', animateHero, { once: true });
        }
    }
};

export const initMagneticButtons = () => {
    if (isMobile()) return;

    const magneticElements = document.querySelectorAll('.btn, .logo, .nav-links a');
    
    magneticElements.forEach(el => {
        let rect = null;

        el.addEventListener('mouseenter', () => {
            rect = el.getBoundingClientRect();
        }, { passive: true });

        el.addEventListener('mousemove', (e) => {
            if (!rect) rect = el.getBoundingClientRect();
            const { clientX, clientY } = e;
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = (clientX - centerX) * 0.25;
            const deltaY = (clientY - centerY) * 0.25;
            
            el.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
        }, { passive: true });

        el.addEventListener('mouseleave', () => {
            rect = null;
            el.style.transform = '';
        }, { passive: true });
    });
};

/* Pause Marquee when not visible on screen */
export const initMarqueePerformance = () => {
    const marquee = document.querySelector('.marquee-content');
    if (!marquee) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            marquee.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
        });
    }, { threshold: 0.1 });

    const parent = document.querySelector('.tech-marquee');
    if (parent) observer.observe(parent);
};

/*
 * Mobile scroll reveal: lightweight, compositor-only (opacity + transform),
 * one IntersectionObserver, each element unobserved after it animates.
 * Hero content is excluded so first paint / LCP is never delayed.
 */
const MOBILE_REVEAL_TARGETS = [
    '.section-header',
    '.tech-marquee',
    '.service-card',
    '.process-item',
    '.about-image-wrapper',
    '.about-title', '.about-lead', '.about-bio',
    '.expertise-row > *',
    '.outcome-box',
    '.project-card',
    '.faq-item',
    '.footer-title',
    '.contact-form-container',
].join(',');

function initMobileScrollReveal() {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) return;

    const targets = [...document.querySelectorAll(MOBILE_REVEAL_TARGETS)]
        .filter(el => !el.closest('.hero'));

    // Leave anything already on screen untouched (no flash on load)
    const vh = window.innerHeight;
    const pending = targets.filter(el => el.getBoundingClientRect().top > vh * 0.9);
    if (!pending.length) return;

    pending.forEach(el => el.classList.add('m-reveal'));

    const observer = new IntersectionObserver((entries) => {
        // Stagger only elements entering in the same frame (e.g. a grid row)
        let i = 0;
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            el.style.transitionDelay = `${Math.min(i++, 4) * 60}ms`;
            el.classList.add('m-in');
            observer.unobserve(el);
            // Clean up so hover/tap transitions aren't delayed afterwards
            const cleanup = (e) => {
                if (e.target !== el || e.propertyName !== 'transform') return;
                el.removeEventListener('transitionend', cleanup);
                el.style.transitionDelay = '';
                el.classList.remove('m-reveal', 'm-in');
            };
            el.addEventListener('transitionend', cleanup);
        });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.01 });

    pending.forEach(el => observer.observe(el));
}
