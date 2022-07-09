<script>
    import {NumberParser} from "./NumberParser.js";
    import {createEventDispatcher} from "svelte";

    const parser = new NumberParser();
    const formatter = new Intl.NumberFormat();
    const dispatch = createEventDispatcher();

    export let number = undefined;

    let value;

    $: {
        if (Number.isFinite(number)) {
            value = formatter.format(number);
        }
    }

    function parse() {
        const parsed = parser.parse(value);
        if (Number.isFinite(parsed)) {
            number = parsed;
            dispatch('input', number);
        }
    }
</script>

<input type="text" inputmode="decimal" size="10" bind:value on:input={parse}/>

<style>
    input {
        font-size: 1em;
        text-align: right;
    }
</style>