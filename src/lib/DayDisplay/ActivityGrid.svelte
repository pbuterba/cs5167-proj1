<script>
    import {createEventDispatcher} from 'svelte';
    import Activity from './Activity.svelte';
    import AddNewButton from './AddNewButton.svelte';

    export let activityList;

    const dispatch = createEventDispatcher();

    let buttonSize = activityList.length < 4 ? 50 : 40;
</script>
<main>
    {#each activityList as activity}
        <Activity activityData={activity} />
    {/each}
    <AddNewButton size={buttonSize} on:newEvent />
</main>
<style>
    main {
        background-color: white;
        margin: 2vh 2vw 0 2vw;
        padding: 1vh 1vw;
        border: 1px solid black;
        min-height: 20vh;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
</style>