import Lenis from 'lenis';
import { SCROLL_CONFIG } from './config.js';
import { isTouchDevice } from './utils.js';

let lenis = null;

export const initScroll = () => {
    if (!isTouchDevice) {
        lenis = new Lenis(SCROLL_CONFIG);
        // autoRaf in SCROLL_CONFIG: Lenis drives its own rAF loop
    }
    return lenis;
};

export const getLenis = () => lenis;
export const stopScroll = () => lenis?.stop();
export const startScroll = () => lenis?.start();
