<script>
    import Header from './lib/Header.svelte';
    import Settings from './lib/Settings/Settings.svelte';
    import DayDisplay from './lib/DayDisplay/DayDisplay.svelte';
    import CategoryOverview from './lib/CategoryOverview/CategoryOverview.svelte';

    let settingsOpen = false;

</script>

<main class="header">
    <Header on:openSettings={() => {settingsOpen = true;}}/>
    {#if settingsOpen}
        <Settings />
    {:else}
        <DayDisplay />
        <CategoryOverview />
    {/if}
</main>