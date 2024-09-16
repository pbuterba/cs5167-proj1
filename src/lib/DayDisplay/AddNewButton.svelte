<script>
    import AddIcon from '../../assets/AddIcon.svelte';

    export let size;
</script>
<main>
    <AddIcon width={size} />
    <p>Add new activity</p>
</main>
<style>
    main {
        border: 1px solid transparent;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50%;
        margin: 0.5vh 0.5vw;
    }
    main:hover {
        opacity: 0.7;
        cursor: pointer;
        border: 1px dotted gray;
    }
    main * {
        margin: auto 1vw;
    }
</style>