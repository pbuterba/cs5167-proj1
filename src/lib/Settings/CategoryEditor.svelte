<script>
    import {createEventDispatcher} from 'svelte';
    
    export let category;

    const dispatch = createEventDispatcher();
    let isNewCategory = category !== null && category.name === "";
</script>
<main>
    {#if category === null}
        <div id="full-box">
            <p id="none-selected">Select a category to edit</p>
        </div>
    {:else}
       <h1>Edit Category:</h1>
       <div id="form-fields">
            <div class="control">
                <label for="name-field">Category Name:</label>
                <input bind:value={category.name} />
            </div>
            <div class="control">
                <label for="color-field">Color:</label>
                <input type="color" bind:value={category.color} />
            </div>
       </div>
       <div class="finalization-buttons">
        {#if isNewCategory}
            <button class="finalization-button" on:click={() => {dispatch('categoryCreated', category)}}>Create</button>
        {:else}
            <button class="finalization-button" on:click={() => {dispatch('categoryUpdated', category)}}>Save</button>
        {/if}
        <button class="finalization-button" on:click={() => {dispatch('categoryEditCanceled')}}>Cancel</button>
       </div>
    {/if}
</main>
<style>
    main {
        width: 100%;
        border: 1px solid black;
        text-align: center;
    }
    #full-box {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
    }
    #none-selected {
        color: gray;
        font-size: 2rem;
    }
    #form-fields {
        border: 0.5px solid black;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        width: 33%;
        margin: auto;
    }
    .control {
        margin: 1vh 1vw;
    }
    .control input {
        width: 100%;
    }
    .finalization-buttons {
        margin: 4vh;
    }
    .finalization-button {
        background: lightblue;
        margin: auto 0.25vw;
    }
</style>