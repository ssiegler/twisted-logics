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

    function parse(event) {
        event.target.value = event.target.value.replace(/[^0-9,.]/, '');
        const parsed = parser.parse(event.target.value);
        if (Number.isFinite(parsed)) {
            number = parsed;
            inputs.add(name);
        } else {
            number = null;
        }
    }
</script>

<input type="text" inputmode="decimal" size="10" on:input={parse} bind:value />

<style>
    input {
        font-size: 1em;
        text-align: right;
    }
</style>