<script>
    import GoalCreator from './GoalCreator.svelte';
    import Goal from './Goal.svelte';
    import {selectedDate, storedGoals} from '../../stores.js';
    import {getWeekStart, getMonthStart, getYearStart, getGoalPeriod} from '../utility-functions.js';
    import AddIcon from '../../assets/AddIcon.svelte';

    export let timePeriod;
    export let times;

    //Get date
    let displayedDate;
    selectedDate.subscribe((date) => {
        displayedDate = date;
    });

    //Goals
    let goals;
    storedGoals.subscribe((goalList) => {
        goals = goalList;
    });

    //Goal creator variables
    let goalToEdit = {};
    let goalToEditIndex;
    let showGoalCreator = false;

    function newGoal() {
        goalToEdit = {};
        showGoalCreator = true;
    }

    function editGoal(goal) {
        goalToEdit = goal;
        goalToEditIndex = goals.indexOf(goal);
        showGoalCreator = true;
    }

    function addNewGoal(goal) {
        storedGoals.update((goalList) => {
            goalList.push(goal);
            return goalList;
        });
        showGoalCreator = false;
    }

    function updateGoal(goal) {
        storedGoals.update((goalList) => {
            goalList[goalToEditIndex] = goal;
            return goalList;
        });
        showGoalCreator = false;
    }

    function deleteGoal(goal) {
        for(let i = 0; i < goals.length; i++) {
            if(JSON.stringify(goals[i]) === JSON.stringify(goal)) {
                if(confirm("Delete goal to spend " + goal.time + " minutes in " + goal.category + " category this " + goal.type + "?")) {
                    storedGoals.update((goalList) => {
                        goalList.splice(i, 1);
                        return goalList;
                    });
                }
            }
        }
    }
</script>
<main>
    <h1>{timePeriod === "day" ? "Today's" : "This " + timePeriod + "'s"} goals:</h1>
    {#each goals as goal}
        {#if goal.type === timePeriod && goal.period === getGoalPeriod(goal.type, displayedDate)}
            <Goal
                data={goal}
                currentProgress={times[goal.category]}
                on:editGoal={(event) => {editGoal(event.detail)}}
                on:deleteGoal={(event) => {deleteGoal(event.detail)}}
            />
        {/if}
    {/each}
    <button id="add-goal-button" on:click={() => {newGoal()}}>
        <AddIcon width={25} />
        <p>Create new goal</p>
    </button>
    {#if showGoalCreator}
        <GoalCreator
            goalData={goalToEdit}
            on:newGoalCreated={(event) => {addNewGoal(event.detail)}}
            on:goalUpdated={(event) => {updateGoal(event.detail)}}
            on:cancelNewGoal={() => {showGoalCreator = false;}}
        />
    {/if}
</main>
<style>
    main {
        border: 2px solid black;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 3vh auto auto auto;
        width: 60%;
    }
    h1 {
        font-size: 1.2rem;
    }
    #add-goal-button {
        display: flex;
        align-items: center;
        margin: 2vh auto;
    }
    #add-goal-button * {
        margin: auto 1vw;
    }
</style>