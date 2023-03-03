<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useShowsStore } from '@/stores/shows';
import TelevisionShowSummary from '@/components/TelevisionShowSummary.vue';
import TelevisionShowRating from '@/components/TelevisionShowRating.vue';
import CastCard from '@/components/CastCard.vue';

let tvShow = ref<any>(null);
let tvShowCast = ref<any>(null)
let tvShowPremieredYear = ref<number | null>(null);
let tvShowEndYear = ref<number | null>(null);

const route = useRoute();
const showsStore = useShowsStore();

let showId = route.params.id as string;

onBeforeMount(async () => {
  await showsStore.getTelevisionShowDetails(showId);
});

showsStore.$subscribe((mutation, state) => {
  tvShow.value = state.selectedShow.show
  tvShowCast.value = state.selectedShow.cast
  tvShowPremieredYear.value = new Date(state.selectedShow.show.premiered).getFullYear();
  tvShowEndYear.value = state.selectedShow.show.ended ? new Date(state.selectedShow.show.ended).getFullYear() : null
})

</script>

<template>
    <div v-if="tvShow" class="container">
        <div>
            <h1>{{ tvShow.name }}</h1>
        </div>
        <div>
            <div class="duration-rating-section">
                <div>{{ tvShowPremieredYear }} - {{ tvShowEndYear }}</div>
                <TelevisionShowRating :rating="tvShow.rating"  />
            </div>
            <TelevisionShowSummary :name="tvShow.name" :image="tvShow.image" :summary="tvShow.summary"  />
            <div class="genres-section">
                <template v-for="(genre, genreIndex) in tvShow.genres" :key="genreIndex">
                    <span>{{ genre }}</span>
                </template>
            </div>
        </div>
        <div>
            <h2>Cast</h2>
            <div class="cast-section">
                <template v-for="(cast, castIndex) in tvShowCast" :key="castIndex">
                    <CastCard :cast="cast" />
                </template>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.duration-rating-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.genres-section {
    margin-top: 15px;
    
    span {
        background-color: #fff;
        border: 1px solid;
        border-radius: 20px;
        padding: 5px;
        margin: 5px;
        font-size: 14px;
    }
}

.cast-section {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
</style>