<script>
    import {inputs} from "./lib/inputs.js";
    import Prozentsatz from "./lib/Prozentsatz.svelte";
    import Rabatt from "./lib/Rabatt.svelte";
    import Aufschlag from "./lib/Aufschlag.svelte";

    const apps = [
        {name: "Prozentrechner", component: Prozentsatz},
        {name: "Rabatt", component: Rabatt},
        {name: "Aufschlag", component: Aufschlag},
    ];

    let selected = apps[0];
    let open = true;

</script>

<main>
    <header>
        <button title="Anwendung wählen" on:click="{() => open=!open}">≡</button>
        <nav>
            <h1 title="Anwendung wählen" on:click="{() => open=!open}">{selected.name}</h1>
            <ul class:open>
                {#each apps.filter((app) => app !== selected) as app}
                    <li on:click={() => {selected = app; open = false; inputs.reset()}}>{app.name}</li>
                {/each}
            </ul>
        </nav>
        <button title="Eingaben Zurücksetzen" on:click="{inputs.reset}" class:open>&#x21bb;</button>
    </header>

    {#if !open}
        <svelte:component this={selected.component}/>
    {/if}
</main>


<style>
    :root {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    main {
        text-align: center;
        padding: 1em;
        margin: 0 auto;
    }

    header {
        font-size: large;
        font-weight: bold;
        display: inline-flex;
        margin: auto;
        align-items: baseline;
        justify-content: space-between;
    }

    button {
        font-size: 1.5em;
        width: 1.5em;
        height: 1.5em;
        text-align: center;
    }

    h1 {
        font-size: unset;
    }

    ul {
        list-style-type: none;
        position: relative;
        height: 0;
        margin: 0;
        padding: 0;
        visibility: hidden;
        overflow: hidden;
    }

    h1, li {
        margin: 1ex 0;
        padding: 0 1ex;
        display: block;
        height: 1.5em;
    }

    h1:hover, li:hover {
        text-decoration: underline;
    }

    ul.open {
        visibility: visible;
        overflow: visible;
        height: auto;
    }

    button.open {
        visibility: hidden;
    }

</style>
