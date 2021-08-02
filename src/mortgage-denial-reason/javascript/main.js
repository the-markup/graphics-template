import Denials from './modules/denials';

const d = new Denials();
d.init();

// listen for resize events (using debounced event listener)
let resize_timeout;
window.addEventListener('resize', e => {
    if (resize_timeout) window.cancelAnimationFrame(resize_timeout); // if there's an existing resize call, cancel it
    resize_timeout = window.requestAnimationFrame(() => d.resize()); // setup the new requestAnimationFrame()
}, false);