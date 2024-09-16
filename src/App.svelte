<script>
    import Header from './lib/Header.svelte';
    import DayDisplay from './lib/DayDisplay/DayDisplay.svelte';
    import {getDateSlug} from './lib/utility-functions.js';
    import {activityData} from './data/activities.js';

    let loggedActivities = activityData;

    let currDate = getDateSlug(new Date());
    let currDayActivities = currDate in loggedActivities ? loggedActivities[currDate] : [];
</script>

<div class="header">
    <Header />
    <DayDisplay date={new Date()} dayActivities={currDayActivities} />
</div>