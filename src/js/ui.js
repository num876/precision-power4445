import { isMobile, hapticFeedback } from './utils.js';
import { projects } from './projects.js';
import { stopScroll, startScroll } from './scroll.js';

export const initNavigation = () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let isScrolled = false;
    const checkScroll = () => {
        const threshold = isMobile() ? 20 : 50;
        const shouldBeScrolled = window.scrollY > threshold;
        if (shouldBeScrolled !== isScrolled) {
            isScrolled = shouldBeScrolled;
            navbar.classList.toggle('scrolled', isScrolled);
        }
    };

    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();

    // Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', (e) => {
            e.preventDefault();
            const isOpen = mobileMenu.classList.contains('active');
            mobileMenu.classList.toggle('active', !isOpen);
            hamburger.classList.toggle('open', !isOpen);
            hamburger.setAttribute('aria-expanded', !isOpen);
            document.body.style.overflow = isOpen ? '' : 'hidden';
            hapticFeedback(isOpen ? 20 : [20, 10, 20]);
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                hapticFeedback(15);
                mobileMenu.classList.remove('active');
                hamburger.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
                
                const target = document.querySelector(href);
                if (target) {
                    setTimeout(() => {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 150);
                }
            });
        });
    }
};

export const initModals = () => {
    const modal = document.querySelector('#project-modal');
    const modalContent = document.querySelector('.modal-content');
    const closeBtn = document.querySelector('.close-modal');

    if (!modal) return;

    window.openProjectModal = (projectId) => {
        const project = projects.find(p => p.id === projectId);
        if (!project) return;

        const modalBody = document.querySelector('.modal-body');
        const isSmallMobile = window.innerWidth < 480;
        
        modalBody.innerHTML = `
            <div class="modal-category" style="color: ${project.color}; text-transform: uppercase; font-size: 0.75rem; font-weight: 700; margin-bottom: 5px;">${project.category}</div>
            <h2 class="modal-title" style="margin-bottom: var(--spacing-sm); font-size: ${isSmallMobile ? '1.4rem' : '2rem'}; line-height: 1.2;">${project.title}</h2>
            <p style="font-size: 0.95rem; color: var(--text-main); line-height: 1.6; margin-bottom: var(--spacing-md); opacity: 0.9;">${project.description}</p>
            
            <div class="modal-grid" style="display: grid; grid-template-columns: ${isMobile() ? '1fr' : '1fr 1fr'}; gap: var(--spacing-sm); margin-bottom: var(--spacing-md); background: rgba(255,255,255,0.03); padding: 16px; border-radius: 12px; border: 1px solid var(--glass-border);">
                <div class="modal-col">
                    <h4 style="color: var(--accent-primary); margin-bottom: 4px; font-size: 0.85rem; text-transform: uppercase;">Project Challenge</h4>
                    <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5;">${project.problem}</p>
                </div>
                <div class="modal-col">
                    <h4 style="color: #4ade80; margin-bottom: 4px; font-size: 0.85rem; text-transform: uppercase;">Delivered Solution</h4>
                    <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5;">${project.solution}</p>
                </div>
            </div>

            <div style="text-align: center; margin-top: var(--spacing-sm);">
                <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="width: ${isMobile() ? '100%' : 'auto'}; min-height: 48px; display: inline-flex; align-items: center; justify-content: center;">Visit Live Website &rarr;</a>
            </div>
        `;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        stopScroll();
    };

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        startScroll();
    };

    closeBtn?.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    if (modalContent) {
        let touchStartY = 0;
        
        modalContent.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
        }, { passive: true });

        modalContent.addEventListener('touchend', (e) => {
            const touchEndY = e.changedTouches[0].clientY;
            const swipeDistance = touchEndY - touchStartY;
            
            // Close if swipe distance is > 80px and user is scrolled to top of modal
            if (swipeDistance > 80 && modalContent.scrollTop <= 5) {
                closeModal();
            }
        }, { passive: true });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });
};

export const initFAQAccordion = () => {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        if (!trigger) return;

        trigger.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-trigger')?.setAttribute('aria-expanded', 'false');
                }
            });

            item.classList.toggle('active', !isActive);
            trigger.setAttribute('aria-expanded', !isActive);
            hapticFeedback(15);
        });
    });
};
