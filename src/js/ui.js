import { isMobile, hapticFeedback } from './utils.js';
import { projects } from './projects.js';
import { stopScroll, startScroll } from './scroll.js';

export const initNavigation = () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        const scrollThreshold = isMobile() ? 20 : 50;
        if (window.scrollY > scrollThreshold) {
            navbar.style.padding = isMobile() ? '0.6rem 0' : '0.8rem 0';
            navbar.style.background = 'hsla(220, 30%, 5%, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.borderBottom = '1px solid var(--glass-border)';
        } else {
            navbar.style.padding = isMobile() ? '0.75rem 0' : '1.5rem 0';
            navbar.style.background = 'transparent';
            navbar.style.backdropFilter = 'none';
            navbar.style.borderBottom = 'none';
        }
    });

    // Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', (e) => {
            e.preventDefault();
            const isOpen = mobileMenu.classList.contains('active');
            mobileMenu.classList.toggle('active');
            hamburger.classList.toggle('open');
            hamburger.setAttribute('aria-expanded', !isOpen);
            hapticFeedback(isOpen ? 30 : [20, 10, 20]);
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                hapticFeedback(15);
                mobileMenu.classList.remove('active');
                hamburger.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
                
                setTimeout(() => {
                    const target = document.querySelector(href);
                    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 300);
            });
        });
    }
};

export const initModals = () => {
    const modal = document.querySelector('#project-modal');
    const modalContainer = document.querySelector('.modal-container');
    const closeBtn = document.querySelector('.close-modal');

    if (!modal) return;

    // We'll use a custom event or direct call for opening modals
    window.openProjectModal = (projectId) => {
        const project = projects.find(p => p.id === projectId);
        if (!project) return;

        const modalContent = document.querySelector('.modal-body');
        const isSmallMobile = window.innerWidth < 480;
        
        modalContent.innerHTML = `
            <div class="modal-category" style="color: ${project.color}; text-transform: uppercase; font-size: 0.75rem; font-weight: 700; margin-bottom: 5px;">${project.category}</div>
            <h2 class="modal-title" style="margin-bottom: var(--spacing-sm); font-size: ${isSmallMobile ? '1.5rem' : '2rem'};">${project.title}</h2>
            <p style="font-size: 1rem; color: var(--text-main); line-height: 1.6; margin-bottom: var(--spacing-md); opacity: 0.9;">${project.description}</p>
            
            <div class="modal-grid" style="display: grid; grid-template-columns: ${isMobile() ? '1fr' : '1fr 1fr'}; gap: var(--spacing-md); margin-bottom: var(--spacing-lg); background: rgba(255,255,255,0.03); padding: 20px; border-radius: 12px; border: 1px solid var(--glass-border);">
                <div class="modal-col">
                    <h4 style="color: var(--accent-primary); margin-bottom: var(--spacing-xs); font-size: 0.9rem; text-transform: uppercase;">The Challenge</h4>
                    <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5;">${project.problem}</p>
                </div>
                <div class="modal-col">
                    <h4 style="color: #4ade80; margin-bottom: var(--spacing-xs); font-size: 0.9rem; text-transform: uppercase;">Technical Capacity</h4>
                    <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5;">${project.solution}</p>
                </div>
            </div>

            <div style="text-align: center; margin-top: var(--spacing-md);">
                <a href="${project.link}" target="_blank" class="btn btn-primary" style="width: ${isMobile() ? '100%' : 'auto'};">Explore Live Architecture</a>
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

    if (modalContainer) {
        let touchStartY = 0;
        
        modal.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
        }, { passive: true });

        modal.addEventListener('touchend', (e) => {
            const touchEndY = e.changedTouches[0].clientY;
            const swipeDistance = touchEndY - touchStartY;
            
            // Close if swipe distance is > 100px and we are at the top of the modal
            if (swipeDistance > 100 && modalContainer.scrollTop <= 0) {
                closeModal();
            }
        }, { passive: true });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });
};
