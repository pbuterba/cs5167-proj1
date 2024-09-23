<script>
    import GoalList from './GoalList.svelte';
    import {selectedDate, storedActivities, storedGoals} from '../../stores.js';
    import {
        getDateSlug,
        dateFromSlug,
        getPreviousDate,
        getNextDate,
        hourAndMinuteDisplay,
        getWeekStart,
        getWeekEnd,
        getMonthStart,
        getMonthEnd,
        getYearStart,
        getYearEnd
    } from '../utility-functions.js';

    export let categories;

    //Get activities
    let activities;
    storedActivities.subscribe((data) => {
        activities = data;
    });

    //Current and displayed date
    $: currDate = getDateSlug(new Date());
    let displayedDate;
    selectedDate.subscribe((date) => {
        displayedDate = date;
    });

    let timePeriod = "day";
    let activitySubset = getActivitySubset(timePeriod, activities, displayedDate);
    $: activitySubset = getActivitySubset(timePeriod, activities, displayedDate);

    function getActivitySubset(selectedTimePeriod, currActivities, newDate) {
        if(selectedTimePeriod === "day") {
            if(newDate in currActivities) { 
                return currActivities[newDate];
            }
            return [];
        } else if(selectedTimePeriod === "week") {
            let startDate = getWeekStart(newDate);
            let endDate = getWeekEnd(newDate);
            return boundedSubset(startDate, endDate);
        } else if(selectedTimePeriod === "month") {
            let startDate = getMonthStart(newDate);
            let endDate = getMonthEnd(newDate);
            return boundedSubset(startDate, endDate);
        } else {
            let startDate = getYearStart(newDate);
            let endDate = getYearEnd(newDate);
            return boundedSubset(startDate, endDate);
        }
    }

    //Calculate time spent on each category
    let categoryTimes = calculateCategoryTimes(activitySubset);
    $: categoryTimes = calculateCategoryTimes(activitySubset);

    function boundedSubset(date, end) {
        let subset = [];
        while(date !== currDate && date !== end) {
            if(date in activities) {
                subset = subset.concat(activities[date]);
            }
            date = getNextDate(date);
        }
        if(date in activities) {
            subset = subset.concat(activities[date]);
        }
        return subset;
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
    <div id="top-bar">
        <h1 style="grid-column: 2">Total time by category:</h1>
        <select id="time-period-selector" bind:value={timePeriod}>
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
            <option value="year">Year</option>
        </select>
    </div>
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
    <GoalList timePeriod={timePeriod} times={categoryTimes} />
</main>
<style>
    main {
        background: #94E1E3;
        border: 2px solid black;
        padding: 1vw 1vh;
    }
    main * {
        margin: auto;
    }
    #top-bar {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }
    h1 {
        font-size: 1.25rem;
    }
    select {
        border-radius: 20px;
        padding: 0.5vh 1vw;
        width: 25%;
        margin: auto 2vw auto auto;
    }
    #category-display {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        width: 70%;
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