export const isMobile = () => window.innerWidth <= 768;
export const isHoverable = window.matchMedia('(hover: hover)').matches;
export const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

export const hapticFeedback = (pattern = 20) => {
    if (navigator.vibrate) {
        navigator.vibrate(pattern);
    }
};
