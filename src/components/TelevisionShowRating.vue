<script setup lang="ts">
const props = defineProps<{
    rating?: {
        average: number;
    }
}>();
</script>

<template>
    <div>
        <div>Rating</div>
        <div class="rating-score-section">
            <font-awesome-icon icon="fa-solid fa-star" />
            <span>{{ rating?.average }}</span>/10
        </div>
    </div>
</template>

<style scoped lang="scss">
.rating-score-section {
    display: flex;
    align-items: center;
    span {
        font-size: 24px;
    }
}
</style>