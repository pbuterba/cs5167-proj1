<script>
    import ActivityGrid from './ActivityGrid.svelte';
    import ActivityCreator from './ActivityCreator.svelte';
    import {getDateSlug, dateFromSlug, getDateText} from '../utility-functions.js';
    import {selectedDate, storedActivities} from '../../stores.js';

    //Get activities
    let activityData;
    storedActivities.subscribe((data) => {
        activityData = data;
    });
    
    //Current and displayed date variables
    let currTime = new Date();
    $: currDate = getDateSlug(currTime);
    let displayedDate;
    selectedDate.subscribe((date) => {
        displayedDate = date;
    });

    $: displayedTime = dateFromSlug(displayedDate);
    $: displayedActivities = displayedDate in activityData ? activityData[displayedDate] : [];
    $: headerText = displayedDate === currDate ? "Today's activities:" : "Past activities:";

    //Activity creator variables
    let activityToEdit = {};
    let activityToEditIndex = -1;
    let showEventCreator = false;

    //Activity creator functions
    function newActivity() {
        activityToEdit = {};
        showEventCreator = true;
    }

    function editActivity(activity) {
        activityToEdit = activity;
        activityToEditIndex = activityData[displayedDate].indexOf(activity);
        showEventCreator = true;
    }

    function addNewActivity(activity) {
        storedActivities.update((data) => {
            if(displayedDate in data) {
                data[displayedDate].push(activity);
            } else {
                data[displayedDate] = [activity];
            }
            data[displayedDate].sort((a, b) => {return parseInt(a.time.split(":")[0]) - parseInt(b.time.split(":")[0])});
            return data;
        });
        showEventCreator = false;
    }

    function updateActivity(activity) {
        storedActivities.update((data) => {
            data[displayedDate][activityToEditIndex] = activity;
            data[displayedDate].sort((a, b) => {return a.time.split(":")[0] - b.time.split(":")[0]});
            return data;
        });
        showEventCreator = false;
    }

    function deleteActivity(activity) {
        for(let i = 0; i < activityData[displayedDate].length; i++) {
            if(JSON.stringify(activityData[displayedDate][i]) === JSON.stringify(activity)) {
                if(confirm('Delete ' + activity.name + "?")) {
                    storedActivities.update((data) => {
                        data[displayedDate].splice(i, 1);
                        return data;
                    });
                }
                break;
            }
        }
        activityData = activityData;
    }

    //Scroll button functions
    function backOneDay() {
        showEventCreator = false;

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

        //Update displayed day
        displayedMonth = displayedMonth < 10 ? "0" + displayedMonth : displayedMonth.toString();
        displayedDay = displayedDay < 10 ? "0" + displayedDay : displayedDay.toString();
        displayedYear = displayedYear.toString();
        selectedDate.set(displayedMonth + "-" + displayedDay + "-" + displayedYear);
    }
    function forwardOneDay() {
        showEventCreator = false;

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

        //Update displayed day
        displayedMonth = displayedMonth < 10 ? "0" + displayedMonth : displayedMonth.toString();
        displayedDay = displayedDay < 10 ? "0" + displayedDay : displayedDay.toString();
        displayedYear = displayedYear.toString();
        selectedDate.set(displayedMonth + "-" + displayedDay + "-" + displayedYear);
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
    {#key displayedActivities}
        <ActivityGrid
            activityList={displayedActivities}
            showAddButton={!showEventCreator}
            on:newActivity={() => {newActivity(event.detail);}}
            on:editActivity={(event) => {editActivity(event.detail);}}
            on:deleteActivity={(event) => {deleteActivity(event.detail);}}
        />
    {/key}
    {#if showEventCreator}
        <ActivityCreator
            activityData={activityToEdit}
            on:newActivityCreated={(event) => {addNewActivity(event.detail);}}
            on:activityUpdated={(event) => {updateActivity(event.detail);}}
            on:cancelNewActivity={() => {showEventCreator = false;}}
        />
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