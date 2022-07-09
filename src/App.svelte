<script>
    import {inputs} from "./lib/inputs.js";
    import NumberInput from "./lib/NumberInput.svelte";
    import ResetButton from "./lib/ResetButton.svelte";

    let rate;
    let base;
    let percentage;

    $: {
        if ($inputs.length >= 2) {
            switch (['rate', 'base', 'percentage'].filter(item => !$inputs.slice(0, 2).includes(item))[0]) {
                case 'rate':
                    rate = 100 * percentage / base;
                    break;
                case 'base':
                    base = percentage / (rate / 100);
                    break;
                case 'percentage':
                    percentage = base * (rate / 100);
                    break;
            }
        }
    }

</script>

<main>
    <nav>
        <h1>Prozentrechner</h1>
        <ResetButton/>
    </nav>
    <form>
        <label>
            <span></span>
            <NumberInput bind:number={rate} name="rate"/>
            <span> %</span>
        </label>
        <label>
            <span>von</span>
            <NumberInput bind:number={base} name="base"/>
            <span></span>
        </label>
        <label>
            <span>sind</span>
            <NumberInput bind:number={percentage} name="percentage"/>
            <span></span>
        </label>

    </form>
</main>


<style>
    :root {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    nav {
        vertical-align: baseline;
    }

    nav * {
        margin: 1ex;
        display: inline-block;
    }

    main {
        text-align: center;
        padding: 1em;
        margin: 0 auto;
    }

    form {
        margin: auto;
        display: table;
        border-collapse: separate;
        border-spacing: 1ex;
    }

    label {
        display: table-row;
    }

    input, label span {
        text-align: right;
        display: table-cell;
    }

</style>
