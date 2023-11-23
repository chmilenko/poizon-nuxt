<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ props }">
        <v-btn dark v-bind="props" @click="getOneSneakers(propsModal.id)">{{
          propsModal.title
        }}</v-btn>
      </template>
      <v-card>
        <v-toolbar style="background-color: #56f1fd">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ propsModal.title }} педали</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn variant="text" @click="dialog = false">Сохранить</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <form-add-put :oneSneaker="oneSneaker" :title="propsModal.title" />
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script setup>
import { useSneakersStore } from "~/store/sneakers";
import FormAddPut from "./FormAddPut.vue";
const dialog = ref(false);

const sneakerStore = useSneakersStore();
const propsModal = defineProps({
  id: {
    type: Number,
    required: false,
    default: () => null,
  },
  title: {
    type: String,
    required: true,
  },
  b: {
    type: Boolean,
    required: true,
    default: () => false,
  },
});
console.log(propsModal);
const getOneSneakers = async (id) => {
  if (propsModal.b) {
    await sneakerStore.getOneSneaker(id);
  } else return;
};
const oneSneaker = computed(() => sneakerStore.oneSneaker);
</script>

<style scoped>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform 0.2s ease-in-out;
}
</style>
