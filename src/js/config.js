export const SCROLL_CONFIG = {
    // lerp smoothing feels more responsive than a fixed 1.2s duration
    lerp: 0.12,
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
    anchors: { offset: -72 },
    autoRaf: true,
};

export const BREAKPOINTS = {
    mobile: 768,
    smallMobile: 480,
};

export const REVEAL_OPTIONS = {
    threshold: 0.1,
};
