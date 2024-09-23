<script>
    import {createEventDispatcher} from 'svelte';
    import {categories} from '../../data/categories.js';
    import {selectedDate} from '../../stores.js';
    import {getWeekStart, getMonthStart, getYearStart, getGoalPeriod} from '../utility-functions.js';

    export let goalData;
    const isNewGoal = goalData.category === undefined;

    const dispatch = createEventDispatcher();

    //Current date
    let displayedDate;
    selectedDate.subscribe((date) => {
        displayedDate = date;
    });

    //Goal info variables
    let goalCategory = goalData.category !== undefined ? goalData.category : "";
    let goalTime = goalData.time !== undefined ? goalData.time : 0;
    let goalType = goalData.type !== undefined ? goalData.type : "week";
    $: goalPeriod = goalData.period !== undefined ? goalData.period : getGoalPeriod(goalType, displayedDate);

    //Data validation
    $: validData = goalTime > 0 && goalCategory !== "";

    function checkDurationBounds() {
        validDuration = activityDuration >= 0;
        validData = validDuration && activityName !== "" && activityCategory !== "";
    }

    //Button click functions
    function newGoal() {
        let exportData = {
            'category': goalCategory,
            'time': goalTime,
            'type': goalType,
            'period': goalPeriod
        };
        dispatch('newGoalCreated', exportData);
    }
    
    function saveGoal() {
        let exportData = {
            'category': goalCategory,
            'time': goalTime,
            'type': goalType,
            'period': goalPeriod
        };
        dispatch('goalUpdated', exportData);
    }

    function cancelGoalCreation() {
        goalCategory = '';
        goalTime = 0;
        goalType = 'week';
        dispatch('cancelNewGoal');
    }
</script>
<main>
    <div id="goal-fields">
        <div class="form-control">
            <label for="category-field">Goal Category:</label>
            <select bind:value={goalCategory} id="category-field">
                <option value=""></option>
                {#each Object.entries(categories) as [category, _]}
                    <option value={category}>{category}</option>
                {/each}
            </select>
        </div>
        <div class="form-control">
            <label for="time-field">Target amount of time (minutes):</label>
            <input id="time-field" type="number" bind:value={goalTime} />
        </div>
        <div class="form-control">
            <label for="period-field">Over the course of this:</label>
            <select id="period-field" bind:value={goalType}>
                <option value="day">Day</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
                <option value="year">Year</option>
            </select>
        </div>
    </div>
    <div class="finalization-buttons">
        {#if isNewGoal}
            <button on:click={() => {newGoal()}} disabled={!validData}>Create</button>
        {:else}
            <button on:click={() => {saveGoal()}} disabled={!validData}>Save</button>
        {/if}
        <button on:click={() => {cancelGoalCreation()}}>Cancel</button>
    </div>
</main>
<style>
    main {
        background-color: #509DA0;
        border: 1px solid black;
        display: flex;
        justify-content: space-between;
        padding: 1vh 1vw;
    }
    #goal-fields {
        display: flex;
    }
    label {
        font-weight: bold;
        font-size: 0.9rem;
    }
    .form-control {
        margin: 2vw;
    }
    .form-control * {
        display: block;
    }
    select {
        width: 100%;
    }
    .finalization-buttons {
        display: flex;
        align-items: center;
    }
    .finalization-buttons button {
        margin: auto 0.5vw;
        background: #94E1E3;
    }
</style>