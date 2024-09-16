<script>
    import ActivityGrid from './ActivityGrid.svelte';
    import {getDateSlug, getDateText} from '../utility-functions.js';

    export let dayActivities;
    export let date;

    let dateSlug = getDateSlug(date);
    let dateText = getDateText(date);
    
    let currDate = new Date();
    let currDateSlug = getDateSlug(currDate);
    let headerText = dateSlug === currDateSlug ? "Today's activities:" : "Edit activities for " + dateText;
</script>

<main>
    <h1>{headerText}</h1>
    <ActivityGrid activityList={dayActivities}/>
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