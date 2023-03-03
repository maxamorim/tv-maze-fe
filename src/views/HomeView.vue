<script setup lang="ts">
import { onBeforeMount, onMounted, onUnmounted, ref } from 'vue';
import TelevisionShowCard from '@/components/TelevisionShowCard.vue';
import TelevisionShowSearch from '@/components/TelevisionShowSearch.vue';
import { useShowsStore } from '@/stores/shows';
import { storeToRefs } from 'pinia';

let tvShows = ref<any>(null);
const scrollComponent = ref(null);

const showsStore = useShowsStore();
const { loadMoreShows } = storeToRefs(showsStore);

onBeforeMount(async () => {
  await showsStore.getTelevisionShows();
});

showsStore.$subscribe((mutation, state) => {
  tvShows.value = state.shows.slice(0, 15)
})

onMounted(() => {
  window.addEventListener("scroll", handleScroll)
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll)
})

const handleScroll = () => {
  let element = scrollComponent.value as any
  if (element.getBoundingClientRect().bottom < window.innerHeight) {
    tvShows.value.push(...loadMoreShows.value(tvShows.value.length))
  }
}

</script>

<template>
  <main class="container">
    <TelevisionShowSearch />
    <div class="tv-shows-container" ref="scrollComponent">
      <template v-if="tvShows?.length > 0">
        <template 
          v-for="(tvShow, tvShowIndex) in tvShows" :key="tvShowIndex">
        <TelevisionShowCard 
          :id="tvShow.id" 
          :name="tvShow.name"
          :image="tvShow.image" 
          :summary="tvShow.summary" 
          :rating="tvShow.rating" />
        </template>
      </template>
      <template v-else>
        <p>No search results.</p>
      </template>
    </div>
  </main>
</template>

<style scoped lang="scss">
.tv-shows-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
