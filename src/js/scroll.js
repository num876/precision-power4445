import Lenis from 'lenis';
import { SCROLL_CONFIG } from './config.js';
import { isTouchDevice } from './utils.js';

let lenis = null;

export const initScroll = () => {
    if (!isTouchDevice) {
        lenis = new Lenis(SCROLL_CONFIG);

        const raf = (time) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);
    }
    return lenis;
};

export const getLenis = () => lenis;
export const stopScroll = () => lenis?.stop();
export const startScroll = () => lenis?.start();
