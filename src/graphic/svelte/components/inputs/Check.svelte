<script>
    export let label, selection;

</script>

<div>
    <input 
        type="checkbox" 
        id="check" 
        value="true" 
        bind:checked={selection} 
        autocomplete="off"
    >
    <label for="check">{label}</label>
</div>