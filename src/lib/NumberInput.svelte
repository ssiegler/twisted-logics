<script>
    import {NumberParser} from "./NumberParser.js";
    import {inputs} from "./inputs.js";

    const parser = new NumberParser("de");
    const formatter = new Intl.NumberFormat("de", {maximumFractionDigits: 5});

    export let number = undefined;
    export let name;

    let value;

    $: value = Number.isFinite(number) ? formatter.format(number) : "";

    $: {
        if ($inputs.length === 0) {
            value = "";
        }
    }

    function parse() {
        value = value.replace(/[^0-9,.]/, '');
        const parsed = parser.parse(value);
        number = Number.isFinite(parsed) ? parsed : undefined;
        inputs.add(name);
    }
</script>

<input type="text" inputmode="decimal" size="10" bind:value on:input={parse}/>

<style>
    input {
        font-size: 1em;
        text-align: right;
    }
</style>