<script setup lang="ts">
const props = defineProps<{
    name: string;
    image?: {
        medium: string;
        original: string;
    };
    summary: string;
}>();
</script>

<template>
    <div class="summary-section">
        <img :src="image?.medium" :alt="name">
        <div class="summary-content" v-html="summary"></div>
    </div>
</template>

<style scoped lang="scss">
.summary-section {
    display: flex;
    flex-direction: row;
    align-items: flex-start;

    img {
        border-radius: 15px;
    }
    
    .summary-content {
        align-self: stretch;
        padding: 10px;
        border-radius: 15px;
        background-color: #E3DFFD;
        margin-left: 10px;
    }
}
</style>