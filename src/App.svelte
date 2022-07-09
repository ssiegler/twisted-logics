<script>
    import {NumberParser} from './lib/NumberParser.js'
    const inputs = ['rate', 'base', 'percentage']
    let rate;
    let base;
    let percentage;
    let lastInput;
    let prevInput;

    function calculateRate() {
        return 100 * percentageValue() / baseValue();
    }

    function calculateBase() {
        return percentageValue() / rateValue();
    }

    function calculatePercentage() {
        return baseValue() * rateValue();
    }

    function rateValue() {
        return new NumberParser().parse(rate) / 100;
    }

    function baseValue() {
        return new NumberParser().parse(base);
    }

    function percentageValue() {
        return new NumberParser().parse(percentage);
    }

    function computeOutput() {
        if (lastInput && prevInput && lastInput !== prevInput) {
            const output = inputs.filter(input => input !== lastInput && input !== prevInput)[0];
            switch (output) {
                case 'rate':
                    rate = new Intl.NumberFormat().format(calculateRate());
                    break;
                case 'base':
                    base = new Intl.NumberFormat().format(calculateBase());
                    break;
                case 'percentage':
                    percentage = new Intl.NumberFormat().format(calculatePercentage());
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

</script>

<main>
    <nav>
        <h1>Prozentrechner</h1>
        <input form="form" type="reset" value="&#x21bb;" title="Zurücksetzen"/>
    </nav>

    <form id="form">
        <label>
            <span></span>
            <input type="text" inputmode="decimal" size="10" step="any" bind:value={rate}
                   on:input="{() => setInput('rate')}"/>
            <span> %</span>
        </label>
        <label>
            <span>von</span>
            <input type="text" inputmode="decimal" size="10" step="any" bind:value={base}
                   on:input="{() => setInput('base')}"/>
            <span></span>
        </label>
        <label>
            <span>sind</span>
            <input type="text" inputmode="decimal" size="10" step="any" bind:value={percentage}
                   on:input="{() => setInput('percentage')}"/>
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
        font-size: 1em;
    }


</style>
