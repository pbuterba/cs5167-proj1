<script>
    import Header from './lib/Header.svelte';
    import DayDisplay from './lib/DayDisplay/DayDisplay.svelte';
    import CategoryOverview from './lib/CategoryOverview/CategoryOverview.svelte';
    import {categories} from './data/categories.js';
</script>

<main class="header">
    <Header />
    <DayDisplay />
    <CategoryOverview categories={categories} />
</main>