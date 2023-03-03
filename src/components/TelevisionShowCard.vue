<script setup lang="ts">
const props = defineProps<{
    id: number;
    name: string;
    image?: {
        medium: string;
        original: string;
    };
    summary?: string;
    rating?: {
        average: number;
    }
}>();
</script>

<template>
    <RouterLink class="tv-show-card" :to="`/show/${id}`">
        <div class="tv-show-container">
            <div class="tv-show-section">
                <img :src="image?.medium" :alt="name">
            </div>
            <div class="tv-show-details-section">
                <div class="rating-section">
                    <font-awesome-icon icon="fa-solid fa-star" />
                    <p>{{ rating?.average }}</p>
                </div>
                <h3>{{ name }}</h3>
            </div>
        </div>
    </RouterLink>
</template>

<style scoped lang="scss">
a {
    text-decoration: none;
}
.tv-show-card {
    max-width: 210px;
    margin: 10px;
    transition: ease-in-out 0.3s;
    &:hover {
        transform: scale(1.05);
    }
}
.tv-show-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: flex-start;
    width: fit-content;
    -webkit-box-shadow: 5px 5px 15px 5px rgba(0,0,0,0.25); 
    box-shadow: 5px 5px 15px 5px rgba(0,0,0,0.25);
    border-radius: 15px;
    background-color: #E3DFFD;
}

.tv-show-section {
    display: inline-flex;

    img {
        border-radius: 15px 15px 0px 0px;
    }
}

.tv-show-details-section {
    padding: 15px;

    .rating-section {
        display: flex;
        align-items: center;

        p {
            margin: 0;
        }
    }
}
</style>