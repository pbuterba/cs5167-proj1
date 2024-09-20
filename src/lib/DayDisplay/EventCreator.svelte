<script>
    import {toTwelveHourTime, addMinutesToTime, subtractTimeFromTime} from "../utility-functions.js";

    export let date;

    let hour = date.getHours();
    let minute = date.getMinutes();

    let defaultMinute = Math.round(minute/15) * 15 < 10 ? "0" + Math.round(minute/15) * 15 : Math.round(minute/15) * 15;
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

    //Event info variables
    let eventName = "";
    let eventStart = hour - 1 + ":" + defaultMinute;
    let eventEnd = hour - 1 + ":" + defaultMinute;
    let eventDuration = 0;
    let eventCategory = "";

    /* Cyclically reactive variables code from
    https://stackoverflow.com/questions/71622971/svelte-how-can-i-declare-two-cyclically-reactive-variables
    */
    const setEnd = () => {
        let endTime = addMinutesToTime(eventStart, eventDuration);
        if(times.includes(endTime)) {
            eventEnd = endTime;
        }
        if(eventDuration < 0) {
            validDuration = false;
        } else {
            validDuration = true;
        }
    }
    const setDuration = () => {
        eventDuration = subtractTimeFromTime(eventEnd, eventStart);
        if(eventDuration < 0) {
            validDuration = false;
        } else {
            validDuration = true;
        }
    }

    $: setEnd(addMinutesToTime(eventStart, eventDuration));
    $: setDuration(subtractTimeFromTime(eventEnd, eventStart));

    //Check input data - end time after start time

</script>
<main>
    <div class="form-control">
        <label for="name-field">Event Name:</label>
        <input bind:value={eventName} id="name-field"/>
    </div>
    <div class="form-control">
        <label for="from-field">Time:</label>
        <div class="time-fields">
            <select id="from-field" bind:value={eventStart}>
                {#each times as time}
                    <option value={time}>{toTwelveHourTime(time, true)}</option>
                {/each}
            </select>
            <label for="to-field">to</label>
            <select id="to-field" class={validDuration ? "" : "invalid-field"} bind:value={eventEnd}>
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
        <input id="duration-field" class={validDuration ? "" : "invalid-field"} type="number" bind:value={eventDuration} />
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