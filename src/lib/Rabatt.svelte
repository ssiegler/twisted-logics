<script>
    import {inputs} from "./inputs.js";
    import NumberInput from "./NumberInput.svelte";

    let base;
    let discount;
    let reduced;
    let saving;

    $: {
        if ($inputs.length >= 2) {
            const input = $inputs.slice(0,2).sort().join(",");
            switch (input) {
                case "base,discount":
                    saving = base * discount / 100;
                    reduced = base - saving;
                    break;
                case "base,reduced":
                    saving = base - reduced;
                    discount = saving * 100 / base;
                    break;
                case "base,saving":
                    reduced = base - saving;
                    discount = saving * 100 / base;
                    break;
                case "discount,reduced":
                    base = reduced * 100 / (100 - discount)
                    saving = base - reduced
                    break;
                case "discount,saving":
                    base = saving * 100 / discount;
                    reduced = base - saving;
                    break;
                case "reduced,saving":
                    base = reduced + saving;
                    discount = saving * 100 / base;
                    break;
            }
        }
    }

</script>

<form>
    <label>
        <span>Vorher</span>
        <NumberInput bind:number={base} name="base"/>
        <span> €</span>
    </label>
    <label>
        <span>Rabatt</span>
        <NumberInput bind:number={discount} name="discount"/>
        <span> %</span>
    </label>
    <label>
        <span>Nachher</span>
        <NumberInput bind:number={reduced} name="reduced"/>
        <span> €</span>
    </label>
    <label>
        <span>Sie sparen</span>
        <NumberInput bind:number={saving} name="saving"/>
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
