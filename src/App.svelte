<script>
    import Header from './lib/Header.svelte';
    import DayEditor from './lib/DayDisplay/DayEditor.svelte';
    import {getDateSlug} from './lib/utility-functions.js';
    import {activityData} from './data/activities.js';

    let loggedActivities = activityData;

    let currDate = getDateSlug(new Date());
    let currDayActivities = currDate in loggedActivities ? loggedActivities['09-12-2024'] : [];
</script>

<div class="header">
    <Header />
    <DayEditor date={new Date()} dayActivities={currDayActivities} />
</div>