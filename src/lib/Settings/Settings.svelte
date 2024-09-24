<script>
    import Category from './Category.svelte';
    import CategoryEditor from './CategoryEditor.svelte';
    import {storedCategories} from '../../stores.js';

    let categories;
    storedCategories.subscribe((data) => {
        categories = data;
    });
    let selectedCategory = null;

    function updateCategory(category) {
        storedCategories.update((categoryList) => {
            if(selectedCategory.name !== category.name) {
                delete categoryList[selectedCategory.name]
            }
            categoryList[category.name] = category.color;
            return categoryList;
        });
        selectedCategory = null;
    }

</script>
<main>
    <h1>Settings:</h1>
    <section>
        <h2>Categories:</h2>
        <div id="categories-section">
            <div id="category-list">
                {#each Object.entries(categories) as [category, color]}
                    <div class="category-listing">
                        <Category
                            data={{'name': category, "color": color}}
                            selected={selectedCategory !== null && selectedCategory.name === category}
                            on:categorySelected={(event) => {selectedCategory = event.detail}}
                        />
                        <button class="delete-button">Delete</button>
                    </div>
                {/each}
            </div>
            <CategoryEditor
                category={selectedCategory}
                on:categoryUpdated={(event) => {updateCategory(event.detail);}}
                on:categoryEditCanceled={() => {selectedCategory = null;}}
            />
        </div>
    </section>
    <section>
        <h2>Times:</h2>
    </section>
</main>
<style>
    main {
        text-align: left;
        background: white;
        padding: 2vh 2vw;
    }
    h1 {
        font-size: 1.75rem;
        margin: 0;
    }
    h2 {
        font-size: 1.25rem;
        margin-top: 0;
    }
    section {
        padding: 2vh 1vw;
        border: 1px solid gray;
        border-width: 1px 0;
    }
    #categories-section {
        display: flex;
    }
    #category-list {
        width: 50%;
    }
    .category-listing {
        display: flex;
        align-items: center;
    }
    .delete-button {
        background: lightblue;
        display: flex;
        align-items: center;
        height: 3vh;
        font-size: 1rem;
        padding: 0.25vh 0.5vw;
        margin: 0 0.5vw;
        border-radius: 0;
    }
</style>