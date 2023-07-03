<script lang="ts">
	let message: string = 'This example comes from App.svelte!';
	let typeScript: boolean = true;
	let scss: boolean = true;
</script>

<div class="messages">
	<p>{message}</p>
	{#if typeScript} <p class="typescript">With TypeScript!</p> {/if}
	{#if scss} <p class="scss">With SCSS!</p> {/if}
</div>

<style lang="scss">
	.messages {
		.typescript {
			color: white;
			background-color: #3F74BA;
		}

		.scss {
			color: white;
			background-color: #BA6993;
		}
	}
</style>