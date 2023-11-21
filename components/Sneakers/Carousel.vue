<template>
  <v-carousel>
    <v-carousel-item
      :src="`${config.public.apiBase}${photo.mainPhoto}`"
      cover
    ></v-carousel-item>
    <v-carousel-item
      :src="`${config.public.apiBase}${photo.two}`"
      cover
    ></v-carousel-item>
    <v-carousel-item
      :src="`${config.public.apiBase}${photo.three}`"
      cover
    ></v-carousel-item>
    <v-carousel-item
      :src="`${config.public.apiBase}${photo.four}`"
      cover
    ></v-carousel-item>
    <v-carousel-item
      :src="`${config.public.apiBase}${photo.five}`"
      cover
    ></v-carousel-item>
    <v-carousel-item
      :src="`${config.public.apiBase}${photo.six}`"
      cover
    ></v-carousel-item>
  </v-carousel>
</template>

<script setup>
const props = defineProps({
  photo: {
    type: Array,
    required: true,
    default: () => [],
  },
});
const config = useRuntimeConfig();
</script>
<style scoped></style>
