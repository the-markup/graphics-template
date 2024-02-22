<script>
    export let data, selection;

    //data = [
    //  {"id": "id", "label": "label"}
    //]

	import { fade } from 'svelte/transition';
</script>

<fieldset in:fade={{ delay: 500 }}>
	{#each data as d}
		<input 
			type="radio" 
			id={d.id} 
			value={d.id}  
			bind:group={selection}
			autocomplete="off"
		>
		<label for={d.id}>{d.label}</label>
	{/each}
</fieldset>

<style lang="scss">

	fieldset {
		border: none;
		padding: 0px;
        text-align: center;
	}
	    input {
            opacity: 0;
            position: absolute;
            z-index: -1;
            
        }
        input:focus {
            outline: solid 1px $c-light-blue;
        }
        label {
			display: inline-block;
            background: #ffffff;
            border: 1px solid #66615B;
            padding: 0.2em 0.5em;
            margin: 4px 2px;
            cursor: pointer;
            transition: all 0.2s linear;
            position: relative;
            z-index: 2;
			font-size: $fs-xxs;

            @include mq($bp-tablet) {
                    font-size: $fs-xs;
                }

            @media (hover:hover) {
                &:hover {
                background: $c-light-blue;
                transform: translate(-2px, -2px);
                border-color: $c-navy;
                }
            }
        }
        input:checked + label {
                background: $c-navy;
                color: white;
                border: 1px solid $c-navy;
        }
</style>