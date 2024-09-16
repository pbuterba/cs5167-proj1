<script>
    import {toTwelveHourTime} from '../utility-functions.js'
    import {colorMappings} from '../../data/color-mappings.js';

    export let activityData;
</script>

<main style={"background-color: " + colorMappings[activityData.category]}>
    <p>{toTwelveHourTime(activityData.time)}</p>
    <h1>{activityData.name}</h1>
    <p class="duration">{activityData.duration}m</p>
</main>

<style>
    main {
        border: 1px solid black;
        margin: 0.5vh 0.5vw;
        display: flex;
        justify-content: space-between;
        height: 50%;
    }
    main * {
        margin: auto 0.6vw;
    }
    h1 {
        font-size: 1rem;
    }
    .duration {
        font-style: italic;
    }
</style>