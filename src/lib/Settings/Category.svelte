<script>
    import {createEventDispatcher} from 'svelte';

    export let data;
    export let selected;

    const dispatch = createEventDispatcher();

    let hovered = false;
</script>
<button
    id={selected || hovered ? "selected" : ""}
    on:mouseenter={() => {hovered = true;}}
    on:mouseleave={() => {hovered=false;}}
    on:click={dispatch('categorySelected', data)}
>
    <h1>{data.name}</h1>
    <svg width="30" height="30" viewBox="0 0 10 10">
        <g>
            <circle r="5" cx="5" cy="5" stroke-width="0.1" fill={data.color} stroke="black" />
        </g>
    </svg>
</button>
<style>
    button {
        background: white;
        border: 1px solid black;
        border-radius: 0;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 60%;
    }
    #selected {
        background: lightblue;
    }
    button * {
        margin: 1vw;
    }
    h1 {
        font-size: 1.2rem;
    }
</style>