<script>
    import {createEventDispatcher} from 'svelte';
    import Activity from './Activity.svelte';
    import AddNewButton from './AddNewButton.svelte';

    export let activityList;
    export let showAddButton;

    const dispatch = createEventDispatcher();
</script>
    <main>
        {#key activityList}
            {#each activityList as activity}
                <Activity activityData={activity} />
            {/each}
        {/key}
        {#if showAddButton}
            <AddNewButton size={40} on:newEvent />
        {/if}
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