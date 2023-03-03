<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <h1>
    <RouterLink to="/" class="home-link"><font-awesome-icon icon="fa-solid fa-tv" /> <span>ABN TV</span></RouterLink>
  </h1>
  <RouterView />
</template>

<style lang="scss">
.home-link {
  text-decoration: none;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;

  span {
    margin-left: 10px;
  }
}
</style>
