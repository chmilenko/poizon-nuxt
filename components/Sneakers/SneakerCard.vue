<template>
  <div>
    <div v-for="photo in sneaker.Photos" :key="photo.id">
      <Carousel :photo="photo" />
    </div>
    <div>{{ sneaker.Mark.name }}</div>
    <p>{{ sneaker.name }}</p>
    <p>{{ sneaker.price }}</p>
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
<style scoped></style>
