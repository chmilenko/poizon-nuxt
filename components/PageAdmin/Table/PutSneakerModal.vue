<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ props }">
        <v-btn dark v-bind="props">Изменить</v-btn>
      </template>
      <v-card>
        <v-toolbar style="background-color: #56f1fd">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Изменяй педали</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn variant="text" @click="dialog = false">Сохранить</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <div сlass="formAddSneakers"></div>
        <FormAddPut :id="getProp" />
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script setup>
import { useSneakersStore } from "~/store/sneakers";
import FormAddPut from "./FormPut.vue";

const dialog = ref(false);
const notifications = ref(false);
const sound = ref(false);
const widgets = ref(false);

const sneakerStore = useSneakersStore();
const modalProps = defineProps({
  id: {
    type: Number,
    required: true,
    default: null,
  },
});

const getProp = modalProps.id;
</script>

<style scoped>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform 0.2s ease-in-out;
}
</style>
