import App from './App.svelte';

export default new App({
    target: document.getElementById(`svelte-${process.env.GRAPHIC_NAME}`)
});