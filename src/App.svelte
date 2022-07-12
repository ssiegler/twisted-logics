<script>
    import ResetButton from "./lib/ResetButton.svelte";
    import Prozentsatz from "./lib/Prozentsatz.svelte";
    import Rabatt from "./lib/Rabatt.svelte";

    const apps = [
        {name: "Prozentrechner", component: Prozentsatz},
        {name: "Rabatt", component: Rabatt},
    ];

    let selected = apps[0];
    let open = false;

</script>

<main>
    <header>
        <button title="Anwendung wählen" on:click="{() => open=!open}">≡</button>
        <nav>
        <h1 title="Anwendung wählen" on:click="{() => open=!open}" >{selected.name}</h1>
        <ul class:open>
            {#each apps.filter((app) => app !== selected) as app}
                <li on:click={() => {selected = app; open = false;}}>{app.name}</li>
            {/each}
        </ul>
        </nav>
        <ResetButton/>
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

    .open {
        visibility: visible;
        overflow: visible;
        height: auto;
    }
</style>
