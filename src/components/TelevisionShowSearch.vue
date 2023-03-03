<script setup lang="ts">
import { ref } from 'vue';
import { useShowsStore } from '@/stores/shows'

const query = ref('');
const genre = ref('');
const descendingOrder = ref(false);

const showsStore = useShowsStore();

const onSubmit = (): void => {
    showsStore.searchTelevisionShows(query.value);
}

const filterByGenre = (): void => {
    showsStore.filterByGenre(genre.value);
}

const sortShowsByRating = (): void => {
    descendingOrder.value = !descendingOrder.value;
    showsStore.sortByRating(descendingOrder.value);
}
</script>

<template>
    <div class="search-container">
        <div>
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
            <input id="search-input" type="text" v-model="query" class="search-input" @keyup.enter="onSubmit">
        </div>
    </div>
    <div class="filters-section">
        <div>
            <label>Genres: </label>
            <select class="genre-list" name="genre" id="genre" v-model="genre" @change="filterByGenre()">
                <option value="comedy">Comedy</option>
                <option value="science-fiction">Science-Fiction</option>
                <option value="romance">Romance</option>
                <option value="action">Action</option>
                <option value="thriller">Thriller</option>
                <option value="drama">Drama</option>
                <option value="mistery">Mistery</option>
                <option value="crime">Crime</option>
                <option value="animation">Animation</option>
                <option value="adventure">Adventure</option>
                <option value="fantasy">Fantasy</option>
                <option value="superhero">Superhero</option>
            </select>
        </div>
        <div>
            <button id="sorting-button" type="button" class="sorting-button" @click="sortShowsByRating()">Sort by rating 
                <font-awesome-icon v-if="descendingOrder" icon="fa-solid fa-arrow-up-short-wide" />
                <font-awesome-icon v-else icon="fa-solid fa-arrow-down-short-wide" />
            </button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.search-container {
    display: flex;
    align-items: center;
    border: 1px solid #E5D1FA;
    border-radius: 15px;
    padding: 5px;
    background-color: #fff;
    max-width: 50%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 30px;
    margin-bottom: 30px;

    div:first-child {
        flex-grow: 1;

        input {
            width: calc(100% - 45px);
        }
    }
}

.search-input {
    border: none;
    padding-left: 10px;
    padding-right: 10px;
    flex-grow: 10;

    &:focus-visible {
        outline: none;
    }
}

.filters-section {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    white-space: nowrap;
}

.genre-list {
    border: 1px solid #E5D1FA;
    border-radius: 15px;
    padding: 10px;
    cursor: pointer;

    &:focus-visible {
        outline: none;
    }
}

.sorting-button {
    border: 1px solid #E5D1FA;
    border-radius: 15px;
    padding: 10px;
    background-color: #E3DFFD;
    transition: ease-in-out 0.3s;
    cursor: pointer;

    &:hover {
        background-color: #9089bb;
    }
}
</style>