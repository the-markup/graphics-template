<script>
    import { createEventDispatcher} from "svelte";

    export let data, selection = "", label;


    const dispatch = createEventDispatcher();
    const submit = () => dispatch('submit');

</script>

<div class="select-container">
    <label for="domain-select">{label}</label>
    <div class="select-wrapper">
        <select 
            id="domain-select" 
            bind:value={tcoURL} 
            on:change={submit}
            autocomplete="off"
            >
            <option class="placeholder" value={tcoURL} selected disabled>List of URLs we tested</option>
            {#each cleanURLs as website}
                <option 
                    value={website.tco}       
                    >{website.cleanURL}</option>
            {/each}
        </select>
    </div>
</div>

<style lang="scss">
    .placeholder {
        display: none;
    }

    .select-container {
        max-width: 300px;
        margin: 0px 0px 20px 0px;
        display: flex;
        flex-flow: column nowrap;
        position: relative;
        
        label {
            color: $c-tan;
            @include mq(0, $bp-mobile) {
					font-size: $fs-xxs;
                } 
        }
    
    .select-wrapper {
        position: relative;
        cursor: pointer;
        white-space: nowrap;

        select {
            appearance: none;
            cursor: pointer;
            display: block;
            font-family: inherit;
            font-size: 100%;
            color: $c-tan;
            box-sizing: border-box;
            width: 100%;
            margin: 0;
            border: 1px solid $c-tan;
            background-color: #fff;
            position: relative;
            z-index: 2;
            padding: 5px;
            transition: all 0.2s ease-in;
            @include mq(0, $bp-mobile) {
					font-size: $fs-xxs;
                } 

            &:hover {
                background-color: $c-light-blue;
            }
        }
    }    
}

.select-wrapper::before {
    content: '';
    position: absolute;
    z-index: 1;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='3' height='3'%3E%3Ccircle cx='2.5' cy='2.5' r='.5' fill='%23242a49'/%3E%3C/svg%3E") bottom right;
    top: 6px;
    left: 6px;
    width: 100%;
    height: 100%;
}</style>