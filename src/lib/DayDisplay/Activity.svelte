<script>
    import {createEventDispatcher} from 'svelte';
    import {toTwelveHourTime} from '../utility-functions.js'
    import {storedCategories} from '../../stores.js';

    export let activityData;

    const dispatch = createEventDispatcher();

    let focused = false;

    //Get categories
    let categories;
    storedCategories.subscribe((data) => {
        categories = data;
    });

    //Determine colors
    let color = categories[activityData.category];
    let channelSum = 0;
    for(let i = 1; i <= 5; i += 2) {
        let channel = parseInt(color.substring(i, i + 2), 16);
        channelSum += channel;
    }
    let channelAverage = channelSum/3;
    let contrastColor = channelAverage < 127 ? "white" : "black";
    let textColor = channelAverage < 127 ? "black" : "white";

    function getChannelContrast(value) {
        value = value - 127;
        if(value < 0) {
            value = 255 + value;
        }
        return value;
    }

    //Edit and delete functions
    function editActivity() {
        dispatch('editActivity', activityData);
    }
    function deleteActivity() {
        dispatch('deleteActivity', activityData);
    }
</script>

<main on:mouseenter={() => {focused = true}} on:mouseleave={() => {focused = false}} style={"background-color: " + color}>
    <div id="edit-buttons">
        {#if focused}
            <button style={"background-color: " + contrastColor + "; color: " + textColor} on:click={editActivity}>Edit</button>
            <button style={"background-color: " + contrastColor + "; color: " + textColor} on:click={deleteActivity}>Delete</button>
        {/if}
    </div>
    <div id="activity-info">
        <p>{toTwelveHourTime(activityData.time, false)}</p>
        <h1>{activityData.name}</h1>
        <p class="duration">{activityData.duration}m</p>
    </div>
</main>

<style>
    main {
        border: 1px solid black;
        margin: 0.5vh 0.5vw;
        height: 8vh;
    }
    #activity-info {
        display: flex;
        justify-content: space-between;
    }
    #activity-info * {
        margin: auto 0.6vw;
    }
    h1 {
        font-size: 1rem;
    }
    .duration {
        font-style: italic;
    }
    #edit-buttons {
        display: flex;
        justify-content: flex-end;
        padding: 0.5vh 0.5vw;
        min-height: 2vh;
    }
    #edit-buttons button {
        display: flex;
        align-items: center;
        height: 2vh;
        font-size: 0.8rem;
        padding: 0.25vh 0.5vw;
        margin: 0 0.25vw;
        border-radius: 0;
    }
</style>