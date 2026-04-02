export const SCROLL_CONFIG = {
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
};

export const BREAKPOINTS = {
    mobile: 768,
    smallMobile: 480,
};

export const REVEAL_OPTIONS = {
    threshold: 0.1,
};
