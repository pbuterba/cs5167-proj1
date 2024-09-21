<script>
    import ActivityGrid from './ActivityGrid.svelte';
    import ActivityCreator from './ActivityCreator.svelte';
    import {getDateSlug, getDateText} from '../utility-functions.js';

    export let activityData;
    
    let currTime = new Date();
    $: currDate = getDateSlug(currTime);

    let displayedTime = currTime;
    $: displayedDate = getDateSlug(displayedTime);

    $: displayedActivities = displayedDate in activityData ? activityData[displayedDate] : [];
    
    $: headerText = displayedDate === currDate ? "Today's activities:" : "Past activities:";

    let showEventCreator = false;

    function addNewEvent(event) {
        if(displayedDate in activityData) {
            activityData[displayedDate].push(event);
        } else {
            activityData[displayedDate] = [event];
        }
        activityData = activityData;
        showEventCreator = false;
    }

    //Scroll button functions
    function backOneDay() {
        //Get current day in components
        let displayedDateComponents = displayedDate.split('-');
        let displayedMonth = parseInt(displayedDateComponents[0]);
        let displayedDay = parseInt(displayedDateComponents[1]);
        let displayedYear = parseInt(displayedDateComponents[2]);

        //Decrement day
        if(displayedMonth === 1 && displayedDay === 1) {
            displayedYear -= 1;
            displayedMonth = 12;
            displayedDay = 31;
        } else if(displayedDay === 1) {
            displayedMonth -= 1;
            if(displayedMonth === 4 || displayedMonth === 6 || displayedMonth === 9 || displayedMonth === 11) {
                displayedDay = 30;
            } else if(displayedMonth === 2 && displayedYear % 4 === 0 && (displayedYear % 100 !== 0 || displayedYear % 400 === 0)) {
                displayedDay = 29;
            } else if(displayedMonth === 2) {
                displayedDay = 28;
            } else {
                displayedDay = 31;
            }
        } else {
            displayedDay -= 1;
        }

        //Update displayed time
        displayedTime = new Date(displayedYear, displayedMonth - 1, displayedDay);
        console.log("Current:" + currDate);
        console.log("Displayed: " + displayedDate);
    }
    function forwardOneDay() {
        //Get current day in components
        let displayedDateComponents = displayedDate.split('-');
        let displayedMonth = parseInt(displayedDateComponents[0]);
        let displayedDay = parseInt(displayedDateComponents[1]);
        let displayedYear = parseInt(displayedDateComponents[2]);

        //Increment day
        if(displayedMonth === 12 && displayedDay === 31) {
            displayedYear += 1;
            displayedMonth = 1;
            displayedDay = 1;
        } else if(
            (displayedDay === 30 && (displayedMonth === 4 || displayedMonth === 6 || displayedMonth === 9 || displayedMonth === 11))
            || (displayedDay === 29 && displayedMonth === 2 && displayedYear % 4 === 0 && (displayedYear % 100 !== 0 || displayedYear % 400 === 0))
            || (displayedDay === 28 && displayedMonth === 2 && (displayedYear % 4 !== 0 || (displayedYear % 100 === 0 && displayedYear % 400 !== 0)))
            || (displayedDay === 31)
        ) {
            displayedMonth += 1;
            displayedDay = 1;
        } else {
            displayedDay += 1;
        }

        //Update displayed time
        displayedTime = new Date(displayedYear, displayedMonth - 1, displayedDay);
    }
</script>

<main>
    <div id="date-controls">
        <h1>{headerText}</h1>
        <div id="scroll-buttons">
            <p>{displayedDate.replaceAll("-", "/")}</p>
            <button id="left-button" on:click={backOneDay}>&#x2BC7;</button>
            <button id="right-button" on:click={forwardOneDay} disabled={currDate === displayedDate}>&#x2BC8;</button>
        </div>
    </div>
    <ActivityGrid activityList={displayedActivities} showAddButton={!showEventCreator} on:newEvent={() => {showEventCreator = true;}} />
    {#if showEventCreator}
        <ActivityCreator on:newEventCreated={(event) => {addNewEvent(event.detail);}} on:cancelNewActivity={() => {showEventCreator = false;}} />
    {/if}
</main>

<style>
    main {
        background: #FFFDD0;
        padding: 1vh 4vw;
        text-align: left;
    }
    #date-controls {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
    }
    h1 {
        font-size: 1.3rem;
    }
    #scroll-buttons {
        height: 100%;
        padding: 0;
        display: flex;
    }
    #scroll-buttons p {
        margin: 0 0.5vw 0 0;
    }
    #scroll-buttons button {
        margin: 0 0 0.5vh 0;
        padding: 0.1vh 0.25vw;
        border: 3px solid black;
    }
    #scroll-buttons button:disabled {
        border: 3px solid gray;
    }
    #left-button {
        border-radius: 5px 0 0 5px;
    }
    #right-button {
        border-radius: 0 5px 5px 0;
    }
</style>