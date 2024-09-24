<script>
    import {createEventDispatcher} from 'svelte';
    import {expandedHourAndMinuteDisplay, getGoalPeriod} from '../utility-functions.js';
    export let data;
    export let currentProgress;

    const dispatch = createEventDispatcher();

    let focused;

    $: progressPercentage = (currentProgress/data.time);
</script>
<main on:mouseenter={() => {focused = true;}} on:mouseleave={() => {focused = false;}}>
    <div id="top-bar">
        <p>At least {expandedHourAndMinuteDisplay(data.time)} in the "{data.category}" category</p>
        {#if focused}
            <div id="edit-buttons">
                <button class="edit-button" on:click={() => {dispatch('editGoal', data)}}>Edit</button>
                <button class="edit-button" on:click={() => {dispatch('deleteGoal', data)}}>Delete</button>
            </div>
        {/if}
    </div>
    <div id="progress-display">
        <label for="progress">Current progress:</label>
        <progress id="progress" value={progressPercentage}>{currentProgress}/{data.time} minutes</progress>
        <p>{Math.min(Math.round(progressPercentage * 100), 100)}%</p>
    </div>
</main>
<style>
    main {
        background: white;
        border-radius: 10px;
        border: 5px solid black;
        margin: 0.5vh auto;
        width: 80%;
    }
    #top-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 1vw;
    }
    #edit-buttons {
        display: flex;
        justify-content: flex-end;
        padding: 0.25vh 0.5vw;
        min-height: 2vh;
    }
    .edit-button {
        background-color: black;
        color: white;
        display: flex;
        align-items: center;
        height: 2vh;
        font-size: 0.8rem;
        padding: 0.25vh 0.5vw;
        margin: 0 0.25vw;
        border-radius: 0;
    }
    #progress-display {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #progress-display * {
        margin: 0 0.25vw;
    }
    progress {
        width: 50%;
        height: 4vh;
    }
</style>