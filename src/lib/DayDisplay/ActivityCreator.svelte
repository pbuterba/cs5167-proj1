<script>
    import {toTwelveHourTime, addMinutesToTime, subtractTimeFromTime} from "../utility-functions.js";
    import {colorMappings} from '../../data/color-mappings.js';

    let date = new Date();

    let hour = date.getHours();
    let minute = date.getMinutes();

    //Get default start time
    const timeIncrement = 5;
    const defaultStepBack = 60;
    let defaultHour;
    let defaultMinute;
    let totalMinutes = minute + hour * 60;
    let defaultTotalMinutes = Math.floor((totalMinutes - defaultStepBack)/timeIncrement) * timeIncrement;
    defaultHour = Math.floor(defaultTotalMinutes/60);
    defaultMinute = defaultTotalMinutes - (Math.floor(defaultTotalMinutes/60) * 60);
    if(defaultMinute < 10) {
        defaultMinute = "0" + defaultMinute;
    }
    let validDuration = true;

    //Populate time list
    const times = [];
    for(let i = 0; i < 24 * 60; i += timeIncrement) {
        let hours = Math.floor(i/60);
        let minutes = i - (Math.floor(i/60) * 60);
        if(minutes < 10) {
            minutes = "0" + minutes;
        }
        times.push(hours + ":" + minutes);
    }

    //Activity info variables
    let activityName = "";
    let activityStart = defaultHour + ":" + defaultMinute;
    let activityEnd = defaultHour + ":" + defaultMinute;
    let activityDuration = 0;
    let activityCategory = "";

    /* Cyclically reactive variables code from
    https://stackoverflow.com/questions/71622971/svelte-how-can-i-declare-two-cyclically-reactive-variables
    */
    const setEnd = () => {
        let endTime = addMinutesToTime(activityStart, activityDuration);
        if(times.includes(endTime)) {
            activityEnd = endTime;
        } else if(parseInt(endTime.split(":")[0]) > 23) {
            activityEnd = '23:45';
            setDuration();
        }
        checkDurationBounds();
    }
    const setDuration = () => {
        activityDuration = subtractTimeFromTime(activityEnd, activityStart);
        checkDurationBounds();
    }

    $: setEnd(addMinutesToTime(activityStart, activityDuration));
    $: setDuration(subtractTimeFromTime(activityEnd, activityStart));

    function checkDurationBounds() {
        if(activityDuration < 0) {
            validDuration = false;
        } else {
            validDuration = true;
        }
    }

</script>
<main>
    <div class="form-control">
        <label for="name-field">Activity Name:</label>
        <input bind:value={activityName} id="name-field"/>
    </div>
    <div class="form-control">
        <label for="from-field">Time:</label>
        <div class="time-fields">
            <select id="from-field" bind:value={activityStart}>
                {#each times as time}
                    <option value={time}>{toTwelveHourTime(time, true)}</option>
                {/each}
            </select>
            <label for="to-field">to</label>
            <select id="to-field" class={validDuration ? "" : "invalid-field"} bind:value={activityEnd}>
                {#each times as time}
                    <option value={time}>{toTwelveHourTime(time, true)}</option>
                {/each}
            </select>
        </div>
        {#if !validDuration}
            <label for="to-field" class="error-label">End time cannot be before start time</label>
        {/if}
    </div>
    <div class="form-control">
        <label for="duration-field">Duration (minutes):</label>
        <input id="duration-field" class={validDuration ? "" : "invalid-field"} type="number" bind:value={activityDuration} />
        {#if !validDuration}
            <label for="duration-field" class="error-label">End time cannot be before start time</label>
        {/if}
    </div>
    <div id="category-controls" class="form-control">
        <label for="category-field">Category:</label>
        <select id="category-field" class="non-label" bind:value={activityCategory}>
            {#each Object.entries(colorMappings) as [category, _]}
                <option value={category}>{category}</option>
            {/each}
        </select>
        <svg width="20" height="20"  class="non-label">
            <circle r="10" cx="10" cy="10" fill={colorMappings[activityCategory]} stroke="black" />
        </svg>
    </div>
</main>
<style>
    main {
        background-color: #D3D3D3;
        display: flex;
        border: 1px solid black;
        margin: 0 2vw 2vh 2vw;
        padding: 1vh 1vw;
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
    #category-controls {
        display: grid;
        text-align: left;
        grid-template-rows: 1fr 1fr;
        grid-template-columns: 5fr 1fr;
    }
    .time-fields *, #category-controls * {
        display: inline;
    }
    #category-controls * {
        margin: auto 0.25vw;
    }
    #category-controls .non-label {
        grid-row: 2;
    }
    .invalid-field {
        border: 2px solid red;
    }
    .error-label {
        font-size: 0.65rem;
        color: red;
        font-style: italic;
    }
</style>