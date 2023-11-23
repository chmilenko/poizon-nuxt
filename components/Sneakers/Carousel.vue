<template>
  <Swiper
    :modules="[SwiperAutoplay, SwiperEffectCreative]"
    :slides-per-view="1"
    :loop="true"
    :effect="'creative'"
    :autoplay="{
      delay: 8000,
      disableOnInteraction: true,
    }"
    :creative-effect="{
      prev: {
        shadow: false,
        translate: ['-20%', 0, -1],
      },
      next: {
        translate: ['100%', 0, 0],
      },
    }"
  >
    <SwiperSlide
      ><img alt="mainPhoto" :src="`${config.public.apiBase}${photo.mainPhoto}`"
    /></SwiperSlide>
    <SwiperSlide
      ><img :src="`${config.public.apiBase}${photo.two}`"
    /></SwiperSlide>
    <SwiperSlide
      ><img alt="three" :src="`${config.public.apiBase}${photo.three}`"
    /></SwiperSlide>
    <SwiperSlide
      ><img alt="four" :src="`${config.public.apiBase}${photo.four}`"
    /></SwiperSlide>
    <SwiperSlide>
      <img alt="five" :src="`${config.public.apiBase}${photo.five}`"
    /></SwiperSlide>
    <SwiperSlide>
      <img alt="six" :src="`${config.public.apiBase}${photo.six}`"
    /></SwiperSlide>
  </Swiper>
</template>

<script setup>
const props = defineProps({
  photo: {
    type: Object,
    required: true,
    default: () => {},
  },
});
const config = useRuntimeConfig();
</script>
<style scoped>
img {
  width: 500px;
  height: 500px;
}
</style>
