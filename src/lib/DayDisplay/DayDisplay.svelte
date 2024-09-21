<script>
    import ActivityGrid from './ActivityGrid.svelte';
    import ActivityCreator from './ActivityCreator.svelte';
    import {getDateSlug, getDateText} from '../utility-functions.js';

    export let dayActivities;
    export let date;

    let dateSlug = getDateSlug(date);
    let dateText = getDateText(date);
    
    let currDate = new Date();
    let currDateSlug = getDateSlug(currDate);
    let headerText = dateSlug === currDateSlug ? "Today's activities:" : "Edit activities for " + dateText;

    let showEventCreator = false;

    function addNewEvent(event) {
        dayActivities.push(event);
        dayActivities = dayActivities;
        showEventCreator = false;
    }
</script>

<main>
    <h1>{headerText}</h1>
    <ActivityGrid activityList={dayActivities} showAddButton={!showEventCreator} on:newEvent={() => {showEventCreator = true;}} />
    {#if showEventCreator}
        <ActivityCreator on:newEventCreated={(event) => {addNewEvent(event.detail);}} on:cancelNewActivity={() => {showEventCreator = false;}} />
    {/if}
</main>

<style>
    main {
        background: #FFFDD0;
        padding: 1vh 2vw;
    }
    h1 {
        font-size: 1.3rem;
    }
</style>