<script>
    import {createEventDispatcher} from 'svelte';
    import AddIcon from '../../assets/AddIcon.svelte';

    export let size;

    const dispatch = createEventDispatcher();

    function addNewActivity() {
        dispatch('newActivity');
    }
</script>
<button on:click={addNewActivity}>
    <AddIcon width={size} />
    <p>Add new activity</p>
</button>
<style>
    button {
        background: white;
        border: 1px solid transparent;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 8vh;
        margin: 0.5vh 0.5vw;
    }
    button:hover {
        opacity: 0.7;
        cursor: pointer;
        border: 1px dotted gray;
    }
    button * {
        margin: auto 1vw;
    }
</style>