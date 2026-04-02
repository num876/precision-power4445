/**
 * Precision & Power - Main Entry Point
 * -----------------------------------
 * This file serves as the main orchestrator, importing and initializing
 * all functional modules for the portfolio.
 */

import { initScroll } from './src/js/scroll.js';
import { renderProjects } from './src/js/projects.js';
import { 
    initNavigation, 
    initModals 
} from './src/js/ui.js';
import { 
    initRevealAnimations, 
    initCustomCursor, 
    initHeroEffects, 
    initTilts,
    initHeroAnimations
} from './src/js/animations.js';
import { initContactForm } from './src/js/forms.js';

// Initialize all modules once the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // 1. Core behavior
    initScroll();
    
    // 2. Data management & rendering
    renderProjects();
    
    // 3. UI logic
    initNavigation();
    initModals();
    
    // 4. Visual effects & animations
    initRevealAnimations();
    initCustomCursor();
    initHeroEffects();
    initTilts(); 
    initHeroAnimations();
    
    // 5. Functional components
    initContactForm();

    // Delegate project clicks for dynamic content
    const projectGrid = document.querySelector('.project-grid');
    if (projectGrid) {
        projectGrid.addEventListener('click', (e) => {
            const card = e.target.closest('.project-card');
            const imageLink = e.target.closest('.project-image-link');
            
            if (card && imageLink && window.openProjectModal) {
                window.openProjectModal(card.dataset.id);
            }
        });
    }

    // Handle global resize events for dynamic layout adjustments if needed
    let lastWidth = window.innerWidth;
    window.addEventListener('resize', () => {
        const currentWidth = window.innerWidth;
        if ((lastWidth <= 768 && currentWidth > 768) || (lastWidth > 768 && currentWidth <= 768)) {
            // Potential reload or logic toggle for responsive transitions
            lastWidth = currentWidth;
        }
    });
});
