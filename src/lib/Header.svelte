<script>
    import {createEventDispatcher} from 'svelte';
    import { time, elapsedTime } from '../stores.js';
    let userName = 'Preston Buterbaugh';

    const dispatch = createEventDispatcher();

    const dateFormat = new Intl.DateTimeFormat(
        'en',
        {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        }
    );

    let startedTime = new Date(2024, 8, 8);
    $: timeSinceStart = Math.round(($time - startedTime) / (1000 * 60 * 60 * 24))
</script>

<main>
    <div id="top-row">
        <h1>Hello, {userName}!</h1>
        <div id="header-buttons">
            <button id="settings-button" on:click={() => {dispatch('openSettings');}}>Settings</button>
        </div>
    </div>
    <h2>Today is: <span class="current-day">{dateFormat.format($time)}</span></h2>
    <div id="bottom-row">
        <p>
            You've been recording activities for:
            <span class="stat">{timeSinceStart} {timeSinceStart === 1 ? "day" : "days"}</span>
        </p>
        <p>
            Active for:
            <span class="stat">{$elapsedTime}</span>
        </p>
    </div>
</main>

<style>
    main {
        background: lightblue;
        padding: 1vh 1vw;
        font-family: serif;
    }
    #top-row {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }
    h1, h2 {
        font-family: cursive;
    }
    h1 {
        margin: 0;
        grid-column: 2;
        font-size: 2.5rem;
    }
    #header-buttons {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    #settings-button {
        background: #FFFDD0;
        font-family: sans-serif;
        width: 10vw;
        border-radius: 30px;
    }
    h2 {
        font-size: 1.5rem;
        margin-bottom: 0.5vh;
    }
    .current-day {
        font-size: 2rem;
        font-family: sans-serif;
        font-weight: normal;
        margin: auto 1.5%;
        background: mintcream;
        padding: 0.5vh 0.5vw;
        border: 3px solid black;
    }
    #bottom-row {
        display: flex;
        justify-content: space-between;
        margin: 3vh 0 0 0;
        width: 100%;
    }
    #bottom-row p {
        font-family: sans-serif;
        font-size: 1rem;
        font-style: italic;
        margin: 0;
    }
    .stat {
        font-weight: bold;
    }
</style>