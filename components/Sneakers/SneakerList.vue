<template>
  <div class="sneakers-block">
    <div v-for="sneaker in allSneakers" :key="sneaker.id">
      <SneakerCard :sneaker="sneaker" />
    </div>
  </div>
</template>

<script setup>
import { useSneakersStore } from "~/store/sneakers";

import SneakerCard from "./SneakerCard.vue";

const sneakerStore = useSneakersStore();

await sneakerStore.getSneakers();

const allSneakers = computed(() => sneakerStore.sneakers);
console.log("SDADADA:", allSneakers.value);
</script>

<style scoped>
.sneakers-block {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 10vh;
}
</style>
