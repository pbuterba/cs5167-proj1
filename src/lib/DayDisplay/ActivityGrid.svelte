<script>
    import Activity from './Activity.svelte';

    export let activityList;
</script>
<main>
    {#each activityList as activity}
        <Activity activityData={activity} />
    {/each}
</main>
<style>
    main {
        margin: 2vh 2vw;
        padding: 1vh 1vw;
        border: 1px solid black;
        min-height: 30vh;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
</style>