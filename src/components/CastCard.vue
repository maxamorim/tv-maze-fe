<script setup lang="ts">
const props = defineProps<{
    cast: {
        person?: {
            name: string;
            image?: {
                medium: string;
                original: string;
            }
        };
        character?: {
            name: string;
        }
    }
}>();
</script>

<template>
    <div class="cast-card">
        <img :src="cast.person?.image?.medium" :alt="cast.person?.name">
        <div class="person-section">
            <span>{{ cast.person?.name }}</span>
            <p>as {{ cast.character?.name }}</p>
        </div>
    </div>
</template>

<style scoped lang="scss">
.cast-card {
    flex: 0 0 50%;
    display: flex;
    align-items: flex-start;
    margin-bottom: 30px;
    .person-section {
        margin-left: 15px;
    }
    span {
        font-size: 18px;
        font-weight: 600;
    }
    img {
        width: 185px;
        border-radius: 15px;
    }
    p {
        margin: 0;
    }
}
</style>