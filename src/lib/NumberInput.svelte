<script>
    import {NumberParser} from "./NumberParser.js";
    import {createEventDispatcher} from "svelte";

    const parser = new NumberParser("de");
    const formatter = new Intl.NumberFormat("de", {maximumFractionDigits: 5});
    const dispatch = createEventDispatcher();

    export let number = undefined;

    let value;

    $: value = Number.isFinite(number) ? formatter.format(number) : "";


    function parse() {
        value = value.replace(/[^0-9,.]/, '');
        const parsed = parser.parse(value);
        number = Number.isFinite(parsed) ? parsed : undefined;
        dispatch('input', number);
    }
</script>

<input type="text" inputmode="decimal" size="10" bind:value on:input={parse}/>

<style>
    input {
        font-size: 1em;
        text-align: right;
    }
</style>