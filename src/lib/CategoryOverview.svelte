<script>
    import {selectedDate, storedActivities} from '../stores.js';

    export let categories;

    //Get activities
    let activities;
    storedActivities.subscribe((data) => {
        activities = data;
    });

    //Displayed date
    let displayedDate;
    selectedDate.subscribe((date) => {
        displayedDate = date;
    });

    let timePeriod = "Day";
    let activitySubset = getActivitySubset(timePeriod, activities, displayedDate);
    $: activitySubset = getActivitySubset(timePeriod, activities, displayedDate);

    function getActivitySubset(selectedTimePeriod, currActivities, newDate) {
        if(selectedTimePeriod === "Day") {
            if(newDate in currActivities) { 
                return currActivities[newDate];
            }
            return [];
        }
    }

    //Calculate time spent on each category
    let categoryTimes = calculateCategoryTimes(activitySubset);
    $: categoryTimes = calculateCategoryTimes(activitySubset);

    function hourAndMinuteDisplay(minutes) {
        let hours = Math.floor(minutes/60);
        minutes = minutes - hours * 60;
        return hours > 0 ? hours + "h " + minutes + "m" : minutes + "m";
    }

    function calculateCategoryTimes(currSubset) {
        let times = {};
        for(const [category, _] of Object.entries(categories)) {
            times[category] = 0;
            for(let j = 0; j < currSubset.length; j++) {
                if(currSubset[j].category === category) {
                    times[category] += currSubset[j].duration;
                }
            }
        }
        return times;
    }

</script>
<main>
    <h1>Total time by category:</h1>
    <div id="category-display">
        {#each Object.entries(categories) as [category, color]}
            <div class="category-listing">
                <svg width="20" height="20">
                    <circle r="10" cx="10" cy="10" fill={color} stroke="black" />
                </svg>
                <h2>{category}</h2>
                <p> - {hourAndMinuteDisplay(categoryTimes[category])}</p>
            </div>
        {/each}
    </div>
</main>
<style>
    main {
        background: #94E1E3;
        border: 2px solid black;
    }
    h1 {
        font-size: 1.25rem;
    }
    #category-display {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        width: 60%;
        margin: auto;
    }
    .category-listing {
        display: flex;
        align-items: center;
        margin: 2vh 2vw 2vh 0;
    }
    .category-listing * {
        display: inline;
        margin: auto 0.25vw;
    }
    h2 {
        font-size: 1rem;
    }
</style>