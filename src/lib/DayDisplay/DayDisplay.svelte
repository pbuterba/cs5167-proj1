<script>
    import ActivityGrid from './ActivityGrid.svelte';
    import ActivityCreator from './ActivityCreator.svelte';
    import {getDateSlug, getDateText} from '../utility-functions.js';

    export let activityData;
    
    let currTime = new Date();
    $: currDate = getDateSlug(currTime);

    let displayedTime = currTime;
    $: displayedDate = getDateSlug(displayedTime);

    $: displayedActivities = displayedDate in activityData ? activityData[displayedDate] : [];

    let displayedDateText = getDateText(displayedTime);
    
    let headerText = displayedDate === currDate ? "Today's activities:" : "Edit activities for " + displayedDateText;

    let showEventCreator = false;

    function addNewEvent(event) {
        displayedActivities.push(event);
        displayedActivities = displayedActivities;
        showEventCreator = false;
    }
</script>

<main>
    <h1>{headerText}</h1>
    <ActivityGrid activityList={displayedActivities} showAddButton={!showEventCreator} on:newEvent={() => {showEventCreator = true;}} />
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