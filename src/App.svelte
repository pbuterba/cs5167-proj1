<script>
    import Header from './lib/Header.svelte';
    import DayDisplay from './lib/DayDisplay/DayDisplay.svelte';
    import {getDateSlug} from './lib/utility-functions.js';
    import {activityData} from './data/activities.js';

    let loggedActivities = activityData;

    let currTime = new Date();
    $: currTime = new Date();
    let currDate = getDateSlug(currTime);
    let currDayActivities = currDate in loggedActivities ? loggedActivities[currDate] : [];
</script>

<div class="header">
    <Header />
    <DayDisplay date={currTime} dayActivities={currDayActivities} />
</div>