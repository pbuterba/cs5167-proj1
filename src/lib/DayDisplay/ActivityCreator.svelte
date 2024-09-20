<script>
    import {toTwelveHourTime, addMinutesToTime, subtractTimeFromTime} from "../utility-functions.js";

    export let date;

    let hour = date.getHours();
    let minute = date.getMinutes();

    let defaultMinute = Math.floor(minute/15) * 15 < 10 ? "0" + Math.floor(minute/15) * 15 : Math.floor(minute/15) * 15;
    let validDuration = true;

    //Populate time list
    const times = [];
    for(let i = 0; i < 24 * 60; i += 15) {
        let hours = Math.floor(i/60);
        let minutes = i - (Math.floor(i/60) * 60);
        if(minutes < 10) {
            minutes = "0" + minutes;
        }
        times.push(hours + ":" + minutes);
    }

    //Activity info variables
    let activityName = "";
    let activityStart = hour - 1 + ":" + defaultMinute;
    let activityEnd = hour - 1 + ":" + defaultMinute;
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
    .time-fields  * {
        display: inline;
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