import { hapticFeedback } from './utils.js';

export const initContactForm = () => {
    const contactForm = document.querySelector('#contact-form');
    const formStatus = document.querySelector('.form-status');

    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        if (!btn) return;
        
        const originalText = btn.innerText;
        
        btn.disabled = true;
        btn.innerText = 'Sending...';
        btn.style.animation = 'button-pulse 1.5s infinite';
        if (formStatus) formStatus.innerHTML = '';

        hapticFeedback(50);

        // Simulate API call
        setTimeout(() => {
            btn.disabled = false;
            btn.innerText = originalText;
            btn.style.animation = 'none';
            if (formStatus) {
                formStatus.innerHTML = '<span class="form-success" style="color: #4ade80; animation: fade-in 0.5s ease;">✓ Message sent successfully! We will contact you soon.</span>';
            }
            contactForm.reset();
            hapticFeedback([100, 50, 100]);
        }, 1500);
    });
};
