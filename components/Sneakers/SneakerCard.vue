<template>
  <div class="sneaker-card">
    <div v-for="photo in sneaker.Photos" :key="photo.id">
      <Carousel :photo="photo" />
    </div>
    <div>Брэнд: {{ sneaker?.Mark?.name }}</div>
    <p>Модель: {{ sneaker?.name }}</p>
    <p>Цена: {{ sneaker?.price }}</p>
  </div>
</template>

<script setup>
import Carousel from "./Carousel.vue";
const props = defineProps({
  sneaker: {
    type: Object,
    required: true,
    default: () => {},
  },
});
</script>
<style scoped>
.sneaker-card {
  width: 53vh;
}
</style>
