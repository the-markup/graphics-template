import App from './App.svelte';

const GRAPHIC_NAME = 'graphic';

export default new App({
    target: document.getElementById('svelte-' + GRAPHIC_NAME)
});