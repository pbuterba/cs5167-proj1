<script>
    import Activity from './Activity.svelte';
    import AddNewButton from './AddNewButton.svelte';

    export let activityList;
    export let showAddButton;
</script>
    <main>
        {#key activityList}
            {#each activityList as activity}
                <Activity activityData={activity} on:editActivity />
            {/each}
        {/key}
        {#if showAddButton}
            <AddNewButton size={40} on:newActivity />
        {/if}
    </main>
<style>
    main {
        background-color: white;
        padding: 1vh 1vw;
        border: 1px solid black;
        min-height: 20vh;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
</style>