<script>
    import {inputs} from "./inputs.js";
    import NumberInput from "./NumberInput.svelte";

    let cost;
    let markup;
    let profit;
    let revenue;

    function computeOutput(input) {
        switch (input) {
            case "cost,markup":
                profit = cost * markup / 100;
                revenue = cost + profit;
                break;
            case "cost,profit":
                revenue = cost + profit;
                markup = profit * 100 / cost;
                break;
            case "cost,revenue":
                profit = revenue - cost;
                markup = profit * 100 / cost;
                break;
            case "markup,profit":
                cost = profit * 100 / markup;
                revenue = cost + profit;
                break;
            case "markup,revenue":
                profit = revenue * markup / (100 + markup);
                cost = revenue - profit;
                break;
            case "profit,revenue":
                cost = revenue - cost;
                markup = profit * 100 / cost;
                break;

        }
    }

    $: {
        if ($inputs.length >= 2) {
            const input = $inputs.slice(0, 2).sort().join(",");
            computeOutput(input);
        }
    }

</script>

<form>
    <label>
        <span>Kosten</span>
        <NumberInput bind:number={cost} name="cost"/>
        <span> €</span>
    </label>
    <label>
        <span>Aufschlag</span>
        <NumberInput bind:number={markup} name="markup"/>
        <span> %</span>
    </label>
    <label>
        <span>Umsatz</span>
        <NumberInput bind:number={revenue} name="revenue"/>
        <span> €</span>
    </label>
    <label>
        <span>Gewinn</span>
        <NumberInput bind:number={profit} name="profit"/>
        <span> €</span>
    </label>
</form>


<style>
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
