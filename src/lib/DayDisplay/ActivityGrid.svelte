<script>
    import Activity from './Activity.svelte';
    import AddNewButton from './AddNewButton.svelte';

    export let activityList;

    let buttonSize = activityList.length <= 4 ? 50 : 40;
</script>
<main>
    {#each activityList as activity}
        <Activity activityData={activity} />
    {/each}
    <AddNewButton size={buttonSize}/>
</main>
<style>
    main {
        margin: 2vh 2vw;
        padding: 1vh 1vw;
        border: 1px solid black;
        min-height: 20vh;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
</style>