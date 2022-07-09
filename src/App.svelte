<script>
    import NumberInput from "./lib/NumberInput.svelte";

    const inputs = ['rate', 'base', 'percentage']
    let rate;
    let base;
    let percentage;
    let lastInput;
    let prevInput;

    function computeOutput() {
        if (lastInput && prevInput && lastInput !== prevInput) {
            const output = inputs.filter(input => input !== lastInput && input !== prevInput)[0];
            switch (output) {
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

    function setInput(input) {
        if (input !== lastInput) {
            prevInput = lastInput;
            lastInput = input;
        }

        computeOutput();
    }

    function reset() {
        lastInput = undefined;
        prevInput = undefined;
    }

</script>

<main>
    <nav>
        <h1>Prozentrechner</h1>
        <input form="form" type="reset" on:click="{() => reset()}" value="&#x21bb;" title="Zurücksetzen"/>
    </nav>

    <form id="form">
        <label>
            <span></span>
            <NumberInput bind:number={rate} on:input="{() => setInput('rate')}"/>
            <span> %</span>
        </label>
        <label>
            <span>von</span>
            <NumberInput bind:number={base} on:input="{() => setInput('base')}"/>
            <span></span>
        </label>
        <label>
            <span>sind</span>
            <NumberInput bind:number={percentage} on:input="{() => setInput('percentage')}"/>
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
