<script>
    import Header from './lib/Header.svelte';
    import DayDisplay from './lib/DayDisplay/DayDisplay.svelte';
    import {getDateSlug} from './lib/utility-functions.js';
    import {activityData} from './data/activities.js';

    let loggedActivities = activityData;
</script>

<div class="header">
    <Header />
    <DayDisplay activityData={loggedActivities} />
</div>